<?php
  function loadFile($file) {
    if ($file['name'])
    {
      $fn = explode(".", $file['name']);
      $f = $fn[0].time().".".$fn[1];

      if(is_uploaded_file($file['tmp_name']))
      {
        $filename = $_SERVER['DOCUMENT_ROOT']."/assets/resources/$f";

        if (move_uploaded_file($file['tmp_name'], $filename)) {
          $resource = "/assets/resources/$f";

          list($width_orig, $height_orig) = getimagesize($filename);

          $ratio_orig = $width_orig/$height_orig;

          if ($width/$height > $ratio_orig) {
             $width = $height*$ratio_orig;
          } else {
             $height = $width/$ratio_orig;
          }

          $image_p = imagecreatetruecolor($width, $height);
          $image = imagecreatefromjpeg($filename);
          imagecopyresampled($image_p, $image, 0, 0, 0, 0, $width, $height, $width_orig, $height_orig);

          imagejpeg($image_p, $filename, 100);

          return $resource;
        }
      }
    }
  }

  if (count($_FILES) > 0)
  {
    $width = 800;
    $height = 600;

    foreach($_FILES as $key => $file)
    {
      $params['logo'] = loadFile($file)
    }
  }