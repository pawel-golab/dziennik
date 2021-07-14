// motyw ciemny lub jasny
// wykorzystywane przez: /settings.php -> <input type="radio" onclick=...>
function changeLightness()
{
    let lightness = $('#theme-settings').find(
        'input[name=lightness]:checked'
    ).val()

    showChange('',lightness)
}

function changeTheme()
{
    let theme = $('#theme-settings').find(
        'select[name=theme] option:selected'
    ).val()

    alert(theme)

    showChange(theme,'')
}

function showChange(theme, lightness)
{
    //TUTAJ ZMIANY ZROBIĆ, NA RAZIE GIT
    switch (theme) {
        case 'red': {
            document.documentElement.style.setProperty('--back-1','red')
            break;
        }
    }
}