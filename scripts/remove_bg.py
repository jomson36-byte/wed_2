import os
import sys
from pathlib import Path
try:
    from rembg import remove
    from PIL import Image
except ImportError:
    print("Error: Missing dependencies. Please run: pip install rembg pillow")
    sys.exit(1)

def remove_background(input_path, output_folder="output"):
    """
    Removes background from an image or all images in a folder.
    """
    input_path = Path(input_path)
    output_folder = Path(output_folder)
    
    # Create output folder if it doesn't exist
    if not output_folder.exists():
        output_folder.mkdir(parents=True)
        print(f"Created directory: {output_folder}")

    # Identify files to process
    if input_path.is_file():
        files = [input_path]
    elif input_path.is_dir():
        files = list(input_path.glob("*"))
        files = [f for f in files if f.suffix.lower() in ['.jpg', '.jpeg', '.png', '.webp']]
    else:
        print(f"Error: Path {input_path} not found.")
        return

    if not files:
        print("No valid image files found.")
        return

    print(f"Found {len(files)} image(s). Starting processing...")

    for file_path in files:
        try:
            print(f"Processing: {file_path.name}...")
            # Open the image
            input_image = Image.open(file_path)
            
            # Remove background using rembg
            # Use 'alpha_matting=True' for better edges on complex subjects
            output_image = remove(input_image)
            
            # Construct output filename (always save as PNG to support transparency)
            output_path = output_folder / f"{file_path.stem}_nobg.png"
            
            # Save the result
            output_image.save(output_path)
            print(f"Saved to: {output_path}")
            
        except Exception as e:
            print(f"Failed to process {file_path.name}: {e}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("\nUsage:")
        print("  python remove_bg.py <input_file_or_folder> [output_folder]")
        print("\nExample:")
        print("  python remove_bg.py ./images ./result")
        sys.exit(1)

    path = sys.argv[1]
    out = sys.argv[2] if len(sys.argv) > 2 else "output"
    
    remove_background(path, out)
