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
        return move_uploaded_file($file['tmp_name'], $path);
      }
    }

    return false;
  }

  function resizeImage($path, $width, $height) {
    $ratio = $width / $height;

    list($width_orig, $height_orig) = getimagesize($path);
    $ratio_orig = $width_orig / $height_orig;

    $width = $ratio > $ratio_orig ? $height * $ratio_orig : $width;    
    $height = $ratio < $ratio_orig ? $width / $ratio_orig : $height;

    $image_p = imagecreatetruecolor($width, $height);
    $image = imagecreatefromjpeg($path);

    if (imagecopyresampled($image_p, $image, 0, 0, 0, 0, $width, $height, $width_orig, $height_orig)) {
      return imagejpeg($image_p, $path, 100);
    }

    return false;
  }

  $params = array();

  if (count($_FILES) > 0)
  {
    foreach($_FILES as $key => $file)
    {
      $fileName = makeFileName($file);
      $filePath = $_SERVER['DOCUMENT_ROOT']."/assets/resources/$fileName";

      if (loadFile($file, $filePath)) {
        resizeImage($filePath, 800, 600);

        $params[$key] = "/assets/resources/$fileName";
      }
    }
  }