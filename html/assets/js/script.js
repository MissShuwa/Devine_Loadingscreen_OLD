let audio = document.getElementById("music");
let audio2 = new Audio(config.songDirectory)
let playerReady = false

const init = () => {
    const teams = document.getElementById("teams");
    const socials = document.getElementById("socials");
    const servername = document.getElementById("servername");
    const serverdesc = document.getElementById("serverdesc");
    const changelogs = document.getElementById("changelogs");
    const ls = document.getElementById("ls");
    let counter = 0
    let counter2 = 0

    servername.innerText = config.servername;
    serverdesc.innerText = config.serverdesc;

    document.getElementById("transparent-logo").src=config.Logo;
    document.getElementById("filled-logo").src=config.Logo;

    config.socials.forEach( social => {
        counter + 1
        if(counter == 1) {
            socials.innerHTML += `
            <div class="ls__column_social-link discord" onclick"social(1)">
                <img src="${social.icon}" alt="" id="icon-eins">
                <h2>${social.name}</h2>
            </div>
            `
        } else if(counter == 2) {
            socials.innerHTML += `
            <div class="ls__column_social-link twitch">
                <img src="${social.icon}" alt="">
                <h2>${social.name}</h2>
            </div>
            `
        } else {
            socials.innerHTML += `
            <div class="ls__column_social-link web">
                <img src="${social.icon}" alt="">
                <h2>${social.name}</h2>
            </div>
            `
        }
    })

    config.teams.forEach(usr => {
        counter2 = counter2 + 1
        let c = hexToRgb(usr.color)
        teams.innerHTML += `
            <div class="ls__column_teamlist-user">
                <img src="./assets/img/lines.svg" alt="" class="ls__column_teamlist-user_lines left">
                <img src="./assets/img/lines.svg" alt="" class="ls__column_teamlist-user_lines right">
                <img src="${usr.image}" alt="" class="ls__column_teamlist-user_avatar">
                <h2>${usr.name}</h2>
                <span style="background: rgba(${c.r}, ${c.g}, ${c.b}, 0.15);border: calc(var(--piv) * 1) solid ${usr.color};box-shadow: 0 0 calc(var(--piv) * 45) rgba(${c.r}, ${c.g}, ${c.b}, 0.55);">${usr.description}</span>
                <div class="ls__column_teamlist-user_other">
                    <b class="green" id="status-${counter2}">online</b>
                </div>
            </div>
        `
    })

    config.changelog.forEach( log => {
        changelogs.innerHTML += `
        <div class="ls__column_changelog-log">
            <h3>${log.title}</h3>
            <h2>${log.desc}</h2>
            <div class="ls__column_changelog-log_other"><hr></div>
        </div>`;
    })

    if(config.customMusic) {
        playAudio('custom')
    }

    if(config.videoID == '' || config.videoID == null || config.videoID == 'none') {
        let bg = document.getElementById("ls")

        bg.style.backgroundImage(config.backgroundImg)
    } else {
        if(config.muteVideo) {
            $('.ls').append(`<iframe id="youtube-player" class="bg" src="https://www.youtube.com/embed/${config.videoID}?enablejsapi=1&autoplay=1&loop=1&playlist=${config.videoID}&controls=0&showinfo=0&mute=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>`)
        } else {
            $('.ls').append(`<iframe id="youtube-player" class="bg" src="https://www.youtube.com/embed/${config.videoID}?enablejsapi=1&autoplay=1&loop=1&playlist=${config.videoID}&controls=0&showinfo=0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>`)
        }
    }

    $('.social-info-container').hide();
}

init();

function hexToRgb(hex) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

let muted = false
let player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player("youtube-player", {
        events: {
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady() {
    playerReady = true
    player.playVideo();
    player.setVolume(config.defaultVideoVolume);
}

function playAudio(type) {
    if(type == 'custom') {
        audio.play();
        audio2.play();
    } else {
        player.unMute();
    }
}

function stopAudio(type) {
    if(type == 'custom') {
        audio.pause();
        audio2.pause();
    } else {
        player.mute();
    }
}

document.addEventListener("keypress", function(event) {
    if (event.keyCode == 32) {
        if(!muted) {
            muted = true
            if(config.customMusic) {
                stopAudio('custom')
            }
            if(!config.muteVideo) {
                stopAudio('yt')
            }
        } else {
            muted = false
            if(config.customMusic) {
                playAudio('custom')
            }
            if(!config.muteVideo) {
                playAudio('yt')
            }
        }
    }
});

const changeLoading = (num) => {
    const bar = document.getElementById("logobar");
    const loadingText = document.getElementById("loading-text");
    const loadingBar = document.getElementById("loading-bar");
    const divided = num / 2
   // if (config.fillingEffect) {
   //     bar.style.height = `${divided+config.logoStart}%`
   // } else {
   //     bar.style.height = `${config+logoStart+50}%`
   // }


    loadingText.textContent = `${num}%`;
    bar.style.height = `${divided+config.logoStart}%`;
    loadingBar.style.width = `${num}%`
}

const loadingHandlers = {
    loadProgress(data) {
        changeLoading(parseInt(data.loadFraction * 100));
    }
};

window.addEventListener('message', function (e) {
    (loadingHandlers[e.data.eventName] || function () { })(e.data);
});

$(document).on('mousemove', function(e) {
    $('#cursor').css({top: e.pageY + 'px', left: e.pageX + 'px'});
});

if(config.enableCursor) {
    $('#ls').append(`
        <img id="cursor" src="./assets/img/media/cursor.png">
    `)
}

function showInfo(num) {
    if(config.showLinkInfowhileHovering) {
        $('.info-text').text(config.socials[num-1].link)
        $('.social-info-container').fadeIn(400);
        setTimeout(function() {
            $('.social-info-container').fadeOut(250);
        }, 2500);
    }
}

//on hover function
$('.social-info-container').hover(function() {
    $('.social-info-container').show();
});

window.addEventListener('DOMContentLoaded', () => {
    if(window.nuiHandoverData.team1) {
        $('#status-1').text('ONLINE');
    } else {
        $('#status-1').text('OFFLINE');
        $('#status-1').css('color', 'red');
    }
    if(window.nuiHandoverData.team2) {
        $('#status-2').text('ONLINE');
    } else {
        $('#status-2').text('OFFLINE');
        $('#status-2').css('color', 'red');
    }
    if(window.nuiHandoverData.team3) {
        $('#status-3').text('ONLINE');
    } else {
        $('#status-3').text('OFFLINE');
        $('#status-3').css('color', 'red');
    }
    if(window.nuiHandoverData.team4) {
        $('#status-4').text('ONLINE');
    } else {
        $('#status-4').text('OFFLINE');
        $('#status-4').css('color', 'red');
    }
});


