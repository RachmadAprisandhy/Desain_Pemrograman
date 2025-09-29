<?php

function hitungumur($thn_lahir, $thn_sekarang){
    $umur = $thn_sekarang - $thn_lahir;
    return $umur;
}
function perkenalan($nama, $salam="Assalamualaikum"){
    echo $salam . ", ";
    echo "Perkenalkan, nama saya " . $nama."</br>";

echo "saya berusia " . hitungumur(2000, 2024) . " tahun";
echo "senang berkenalan dengan anda</br>";
}

perkenalan("elok");
?>