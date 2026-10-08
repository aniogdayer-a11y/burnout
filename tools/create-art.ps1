# Original vector illustrations, rasterized with the built-in Windows drawing library.
Add-Type -AssemblyName System.Drawing
$assetDir = Join-Path $PSScriptRoot '../assets'
$tempDir = Join-Path $PSScriptRoot '../.build-tools/frames'
New-Item -ItemType Directory -Force $assetDir, $tempDir | Out-Null
function Brush($color) { New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml($color)) }
function Oval($x,$y,$w,$h,$color) { $b=Brush $color; $script:g.FillEllipse($b,[single]$x,[single]$y,[single]$w,[single]$h); $b.Dispose() }
function Line($x,$y,$xx,$yy,$color,$width=3) { $p=New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml($color)), $width; $p.StartCap='Round';$p.EndCap='Round';$script:g.DrawLine($p,[single]$x,[single]$y,[single]$xx,[single]$yy);$p.Dispose() }
function Poly($coords,$color) { $pts=@();for($j=0;$j -lt $coords.Count;$j+=2){$pts+=New-Object System.Drawing.PointF ([single]$coords[$j]),([single]$coords[$j+1])};$b=Brush $color;$script:g.FillPolygon($b,[System.Drawing.PointF[]]$pts);$b.Dispose() }
function Face($x,$y) { Oval ($x-15) $y 4 6 '#665b66';Oval ($x+11) $y 4 6 '#665b66';Oval ($x-25) ($y+9) 11 5 '#e8b5b5';Oval ($x+15) ($y+9) 11 5 '#e8b5b5';Line ($x-4) ($y+12) $x ($y+15) '#665b66' 2;Line $x ($y+15) ($x+4) ($y+12) '#665b66' 2 }
function Star($x,$y,$s,$color) { Poly @($x,($y-$s),($x+3),($y-3),($x+$s),$y,($x+3),($y+3),$x,($y+$s),($x-3),($y+3),($x-$s),$y,($x-3),($y-3)) $color }
function Heart($x,$y,$s,$color) { Oval ($x-$s) ($y-$s/2) $s $s $color;Oval $x ($y-$s/2) $s $s $color;Poly @(($x-$s),$y,($x+$s),$y,$x,($y+$s*1.4)) $color }
$names=@('cloud','plant','tea','heart','sunrise','moon','butterfly','balloon','celebrate')
foreach($name in $names){
  for($i=0;$i -lt 18;$i++){
    $bmp=New-Object System.Drawing.Bitmap 320,240
    $script:g=[System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode='AntiAlias';$g.Clear([System.Drawing.Color]::White)
    $phase=$i/18*2*[Math]::PI;$bob=[Math]::Sin($phase)*5
    Oval 95 202 130 9 '#efedf0'
    switch($name){
      'cloud' { Oval 85 (96+$bob) 150 70 '#e1d8ec';Oval 110 (67+$bob) 75 88 '#e1d8ec';Oval 162 (83+$bob) 56 63 '#e1d8ec';Face 160 (119+$bob);Star 72 77 9 '#cfbadd';Star 245 155 8 '#e5c57b' }
      'plant' { Line 161 151 (161+$bob/2) 64 '#87a080' 5;Oval 117 (92+$bob/2) 45 23 '#a9bd99';Oval 161 (75+$bob/2) 43 25 '#b7c9a5';Line 129 102 161 122 '#87a080' 3;Poly @(118,145,202,145,192,199,129,199) '#c2aed2';Oval 118 137 84 19 '#d4c3e0';Face 160 160;Star 217 59 8 '#c5b6d2';Star 97 119 6 '#d8bd80' }
      'tea' { Oval 195 104 46 52 '#c0a4bd';Oval 204 113 27 33 '#ffffff';Poly @(106,104,208,104,198,174,117,174) '#e9c4cc';Oval 106 93 102 23 '#f0d6da';Oval 116 98 82 13 '#ae8d7f';Oval 106 158 93 26 '#e9c4cc';Face 156 127;Oval 93 183 133 12 '#d7c5de';for($k=0;$k -lt 3;$k++){ $x=133+$k*24;Line $x (80+$bob) ($x+4) (67+$bob) '#d7c5de' 3;Line ($x+4) (67+$bob) $x (54+$bob) '#d7c5de' 3 } }
      'heart' { Heart 160 99 (47+$bob/2) '#e7aebc';Face 160 113;Star 88 73 8 '#c5b4d5';Star 232 141 (9+$bob/3) '#c5b4d5';Heart 224 65 9 '#d4c2e1' }
      'sunrise' { $sy=81+$bob;Oval 119 $sy 82 82 '#efd18d';Face 160 ($sy+29);for($k=0;$k -lt 7;$k++){ $a=($k*30+180)/180*[Math]::PI;Line (160+53*[Math]::Cos($a)) ($sy+41+53*[Math]::Sin($a)) (160+64*[Math]::Cos($a)) ($sy+41+64*[Math]::Sin($a)) '#e5c57b' 3 };Oval 68 147 146 58 '#c9d6b9';Oval 146 154 113 51 '#b4c5a9';Line 66 199 258 199 '#9fb393' 2 }
      'moon' { Oval 108 (62+$bob) 108 120 '#d0bedf';Oval 149 (49+$bob) 81 93 '#ffffff';Face 146 (124+$bob);Star 239 80 (9+$bob/3) '#e4c57f';Star 84 131 (7-$bob/4) '#e4c57f';Star 214 176 6 '#e4c57f';Star 103 59 4 '#cab8da' }
      'butterfly' { $wing=52+[Math]::Sin($phase)*9;Oval (160-$wing-5) (72+$bob) $wing 67 '#c6b2d9';Oval 165 (72+$bob) $wing 67 '#c6b2d9';Oval (164-$wing) (126+$bob) ($wing-7) 46 '#e7bbcb';Oval 163 (126+$bob) ($wing-7) 46 '#e7bbcb';Oval 151 (91+$bob) 19 73 '#8e7b9c';Line 156 (94+$bob) 144 (78+$bob) '#8e7b9c' 2;Line 166 (94+$bob) 178 (78+$bob) '#8e7b9c' 2;Star 91 171 6 '#e3c683';Star 232 71 7 '#e3c683' }
      'balloon' { Line 160 (137+$bob) 151 170 '#ab9cb0' 2;Line 151 170 165 195 '#ab9cb0' 2;Line 165 195 156 216 '#ab9cb0' 2;Oval 119 (47+$bob) 83 103 '#e7b8ca';Poly @(160,(143+$bob),154,(156+$bob),168,(156+$bob)) '#d59fb7';Oval 133 (63+$bob) 11 25 '#f5dce5';Face 162 (96+$bob);Star 91 101 7 '#c8b5d9';Star 232 155 8 '#e6cd96' }
      'celebrate' { Line 160 126 160 191 '#9eaf8d' 5;Oval 116 159 46 21 '#b3c4a1';Oval 164 147 43 22 '#b3c4a1';for($k=0;$k -lt 6;$k++){ $a=$k*[Math]::PI/3;Oval (143+31*[Math]::Cos($a)) (89+$bob+31*[Math]::Sin($a)) 36 37 '#c7b2d9' };Oval 135 (82+$bob) 52 53 '#f1d798';Face 161 (100+$bob);Heart 86 (70-$bob) 10 '#e4a9ba';Heart 240 (102+$bob) 9 '#e4a9ba';Star 94 153 7 '#dfc480';Star 219 55 7 '#dfc480' }
    }
    if($i -eq 0){$bmp.Save((Join-Path $assetDir "$name.png"),[System.Drawing.Imaging.ImageFormat]::Png)}
    $bmp.Save((Join-Path $tempDir "$name-$i.gif"),[System.Drawing.Imaging.ImageFormat]::Gif)
    $g.Dispose();$bmp.Dispose()
  }
}
python (Join-Path $PSScriptRoot 'combine-gifs.py')
