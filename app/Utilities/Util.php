<?php

namespace App\Utilities;

class Util
{
    public function uploadImage($request, $file_name, $dir_name)
    {
        $uploaded_file_name = null;

        $png_url = time() . ".jpg";
        $file = '/uploads/' . $png_url;
        if (substr($request->input($file_name), 0, 10) == "data:image") {
            \Image::make(file_get_contents($request->input($file_name)))->save(public_path() . $file);
        } else {
            if (file_exists($request->input($file_name))) {
                \Image::make(file_get_contents($request->input($file_name)))->save(public_path() . $file);
            }
        }

        $uploaded_file_name = $file;

        return $uploaded_file_name;
    }

    public function is_base64_encoded($data)
    {
        if (preg_match('%^[a-zA-Z0-9/+]*={0,2}$%', $data)) {
            return TRUE;
        } else {
            return FALSE;
        }
    }

    public function check_base64_image($base64)
    {
        $img = imagecreatefromstring(base64_decode($base64));
        if (!$img) {
            return false;
        }

        imagepng($img, 'tmp.png');
        $info = getimagesize('tmp.png');

        unlink('tmp.png');

        if ($info[0] > 0 && $info[1] > 0 && $info['mime']) {
            return true;
        }

        return false;
    }

    function is_base64($str)
    {
        if (base64_encode(base64_decode($str, true)) === $str) {
            return true;
        } else {
            return false;
        }
    }
}
