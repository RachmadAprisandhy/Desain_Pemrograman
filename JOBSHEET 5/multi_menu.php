<?php
$menu = [
    ["nama" => "Beranda"],
    [
        "nama" => "Berita",
        "submenu" => [
            ["nama" => "Wisata",
                "submenu" => [
                    ["nama" => "Pantai"],
                    ["nama" => "Gunung"]
                ]
            ],
            ["nama" => "Kuliner"],
            ["nama" => "Hiburan"]
        ]
    ],
    ["nama" => "Tentang"],
    ["nama" => "Kontak"],
];

function tampilkanmenubertingkat(array $menu) {
    echo "<ul>";
    foreach ($menu as $item) {
        echo "<li>{$item['nama']}";
        if (isset($item['submenu'])) {
            // panggil rekursif untuk submenu
            tampilkanmenubertingkat($item['submenu']);
        }
        echo "</li>";
    }
    echo "</ul>";
}

tampilkanmenubertingkat($menu);
?>
