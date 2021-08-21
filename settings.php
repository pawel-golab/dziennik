<html lang="pl-PL">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <link rel="stylesheet" href="./bootstrap-5/css/bootstrap.min.css"> <!--bootstrap css-->
    <script src="https://kit.fontawesome.com/d5272c5ae6.js" crossorigin="anonymous"></script> <!--fontawesome-->
    <script src="./js-scripts/jQuery.js"></script>
    <script src="./js-scripts/themes.js"></script>
    <link rel="stylesheet" href="./style/main.css">
    <title>eDziennik - Ustawienia</title>
</head>
<body>

<?php include('./header.html'); ?>

<main>
    <section>
        <div id="main-content" class="containerFlex">
            <div class="row no-gutters index-row" id="currentLesson">
                <div class="col-sm-3">Motyw</div>
                <div class="col-sm-9" id="theme-settings">
                    <select name="theme" id="theme-select" onchange="changeTheme()">
                        <option value="blue">Niebieski</option>
                        <option value="cyan">Cyjan</option>
                        <option value="green">Zielony</option>
                        <option value="yellow">Żółty</option>
                        <option value="red">Czerowny</option>
                        <option value="magenta">Fuksja</option>
                        <option value="gray">Szary</option>
                        <option value="black">Czarny</option>
                    </select><br>

                    <input type="radio" name="lightness" value="light" id="lightness-light">
                        <label for="lightness-light">Jasny</label><br>
                    <input type="radio" name="lightness" value="dark" id="lightness-dark">
                        <label for="lightness-dark">Ciemny</label><br>
                    
                    <!-- to najpewniej będzie odwołanie do .php i sql -->
                    <input type="button" value="zatwierdź" onclick="saveThemeChange()">
                </div>
            </div>
        </div>
    </section>
</main>

</body>
</html>