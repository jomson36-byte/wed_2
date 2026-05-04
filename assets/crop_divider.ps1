Add-Type -AssemblyName System.Drawing
$imagePath = "c:\Users\JOMSON\Documents\JOMSON_CODE\wed_2\assets\devider.png"
$img = [System.Drawing.Image]::FromFile($imagePath)
$bmp = New-Object System.Drawing.Bitmap $img

$w = $img.Width
$h = $img.Height

$wLeft = [math]::Round($w * 0.35)
$wCenter = [math]::Round($w * 0.30)
$wRight = $w - $wLeft - $wCenter

$rectLeft = New-Object System.Drawing.Rectangle 0, 0, $wLeft, $h
$bmpLeft = $bmp.Clone($rectLeft, $bmp.PixelFormat)
$bmpLeft.Save("c:\Users\JOMSON\Documents\JOMSON_CODE\wed_2\assets\leaf_left.png", [System.Drawing.Imaging.ImageFormat]::Png)

$rectCenter = New-Object System.Drawing.Rectangle $wLeft, 0, $wCenter, $h
$bmpCenter = $bmp.Clone($rectCenter, $bmp.PixelFormat)
$bmpCenter.Save("c:\Users\JOMSON\Documents\JOMSON_CODE\wed_2\assets\heart.png", [System.Drawing.Imaging.ImageFormat]::Png)

$rectRight = New-Object System.Drawing.Rectangle ($wLeft + $wCenter), 0, $wRight, $h
$bmpRight = $bmp.Clone($rectRight, $bmp.PixelFormat)
$bmpRight.Save("c:\Users\JOMSON\Documents\JOMSON_CODE\wed_2\assets\leaf_right.png", [System.Drawing.Imaging.ImageFormat]::Png)

$img.Dispose()
$bmp.Dispose()
$bmpLeft.Dispose()
$bmpCenter.Dispose()
$bmpRight.Dispose()
Write-Host "Divider cropped successfully"
