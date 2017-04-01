<?php
   $file = "counter";
   if (isset($_GET["increment"])) {
      $json = json_decode(file_get_contents($file),true);
      $counter = $json["counter"];
      $counter++;
      $json["counter"] = $counter;
      $json = json_encode($json);
      file_put_contents($file,$json);
      echo "success";
   }
?>