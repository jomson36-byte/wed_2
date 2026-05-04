Add-Type -AssemblyName System.Drawing
$imagePath = "c:\Users\JOMSON\Documents\JOMSON_CODE\wed_2\assets\typography_center.png"
$img = [System.Drawing.Image]::FromFile($imagePath)
$bmp = New-Object System.Drawing.Bitmap $img

# Let's crop at 65% of height
$splitHeight = [math]::Round($img.Height * 0.65)

$rectNames = New-Object System.Drawing.Rectangle 0, 0, $img.Width, $splitHeight
$bmpNames = $bmp.Clone($rectNames, $bmp.PixelFormat)
$bmpNames.Save("c:\Users\JOMSON\Documents\JOMSON_CODE\wed_2\assets\names.png", [System.Drawing.Imaging.ImageFormat]::Png)

$rectDate = New-Object System.Drawing.Rectangle 0, $splitHeight, $img.Width, ($img.Height - $splitHeight)
$bmpDate = $bmp.Clone($rectDate, $bmp.PixelFormat)
$bmpDate.Save("c:\Users\JOMSON\Documents\JOMSON_CODE\wed_2\assets\date.png", [System.Drawing.Imaging.ImageFormat]::Png)

$img.Dispose()
$bmp.Dispose()
$bmpNames.Dispose()
$bmpDate.Dispose()
Write-Host "Cropping done"
