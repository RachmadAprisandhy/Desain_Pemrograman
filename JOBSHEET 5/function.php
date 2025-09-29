<?php

function perkenalan($nama, $salam="Assalamualaikum"){
    echo $salam . ", ";
    echo "Perkenalkan, nama saya " . $nama."</br>";
    echo "Senang berkenalan dengan anda</br>";
}
perkenalan("hamdana", "halo");

echo "<hr>";

$Saya = "Elok";
$ucapansalam = "Selamat pagi";

perkenalan($Saya, $ucapansalam);
?>