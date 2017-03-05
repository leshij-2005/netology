<?php
  function loadFile($file) {
    function makeFileName($file) {
      $fn = explode(".", $file['name']);

      return $fn[0].time().".".$fn[1];
    }

    if ($file['name'])
    {
      $fileName = makeFileName($file);

      if(is_uploaded_file($file['tmp_name']))
      {
        $filePath = $_SERVER['DOCUMENT_ROOT']."/assets/resources/$fileName";

        if (move_uploaded_file($file['tmp_name'], $filePath)) {
          
          list($width_orig, $height_orig) = getimagesize($filePath);

          $ratio_orig = $width_orig/$height_orig;

          if ($width/$height > $ratio_orig) {
             $width = $height*$ratio_orig;
          } else {
             $height = $width/$ratio_orig;
          }

          $image_p = imagecreatetruecolor($width, $height);
          $image = imagecreatefromjpeg($filePath);
          imagecopyresampled($image_p, $image, 0, 0, 0, 0, $width, $height, $width_orig, $height_orig);

          imagejpeg($image_p, $filePath, 100);

          return "/assets/resources/$fileName";
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