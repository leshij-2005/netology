<?php
  function makeFileName($file) {
    $fn = explode(".", $file['name']);

    return $fn[0].time().".".$fn[1];
  }

  function loadFile($file, $path) {
    if ($file['name'])
    {
      if (is_uploaded_file($file['tmp_name']))
      {
        if (move_uploaded_file($file['tmp_name'], $path)) {

          list($width_orig, $height_orig) = getimagesize($path);

          $ratio_orig = $width_orig/$height_orig;

          if ($width/$height > $ratio_orig) {
            $width = $height*$ratio_orig;
          } else {
            $height = $width/$ratio_orig;
          }

          $image_p = imagecreatetruecolor($width, $height);
          $image = imagecreatefromjpeg($path);
          imagecopyresampled($image_p, $image, 0, 0, 0, 0, $width, $height, $width_orig, $height_orig);

          imagejpeg($image_p, $path, 100);

          return true;
        }
      }
    }

    return false;
  }

  if (count($_FILES) > 0)
  {
    $width = 800;
    $height = 600;

    foreach($_FILES as $key => $file)
    {
      $fileName = makeFileName($file);
      $filePath = $_SERVER['DOCUMENT_ROOT']."/assets/resources/$fileName";

      if (loadFile($file)) {
        $params[$key] = "/assets/resources/$fileName";
      }
    }
  }