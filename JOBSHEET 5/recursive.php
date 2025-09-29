<?php
function tampilkanangka (int $jumlah, int $indeks = 1){
    echo "perulaangan ke-{$indeks}<br>";
    if ($indeks < $jumlah){
        tampilkanangka($jumlah, $indeks + 1);
    }
}

tampilkanangka(20);

?>