// Constants
const AUDIO = document.getElementById("music");
const AUDIO2 = new Audio(config.songDirectory);
const TEAMS = document.getElementById("teams");
const SOCIALS = document.getElementById("socials");
const SERVERNAME = document.getElementById("servername");
const SERVERDESC = document.getElementById("serverdesc");
const CHANGELOGS = document.getElementById("changelogs");

// Global variables
let player;
let muted = false;

// Utility function to convert hex to RGB
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

// Initialize the page
const init = () => {
    AUDIO2.volume = config.customMusicVolume;
    if (SERVERNAME) SERVERNAME.innerText = config.servername;
    if (SERVERDESC) SERVERDESC.innerText = config.serverdesc;

    const transparentLogo = document.getElementById("transparent-logo");
    const filledLogo = document.getElementById("filled-logo");
    if (transparentLogo) transparentLogo.src = config.Logo;
    if (filledLogo) filledLogo.src = config.Logo;

    renderSocials();
    renderTeams();
    renderChangelogs();

    if (config.customMusic) {
        playAudio('custom');
    }

    setupBackground();
    setupCursor();

    $('.social-info-container').hide();

    if (config.disableLogo) {
        $("#transparent-logo, #filled-logo").hide();
    }
};

// Render social media links
const renderSocials = () => {
    if (!SOCIALS) return;
    
    const socialIcons = {
        discord: "discord",
        twitch: "twitch",
        web: "web"
    };

    SOCIALS.innerHTML = config.socials.map((social, index) => `
        <div class="ls__column_social-link ${socialIcons[social.name] || ''}" onclick="showInfo(${index + 1})">
            <img src="${social.icon}" alt="">
            <h2>${social.name}</h2>
        </div>
    `).join('');
};

// Render team members
const renderTeams = () => {
    if (!TEAMS) return;
    
    TEAMS.innerHTML = config.teams.map((usr, index) => {
        const c = hexToRgb(usr.color);
        return `
            <div class="ls__column_teamlist-user">
                <img src="./assets/img/lines.svg" alt="" class="ls__column_teamlist-user_lines left">
                <img src="./assets/img/lines.svg" alt="" class="ls__column_teamlist-user_lines right">
                <img src="${usr.image}" alt="" class="ls__column_teamlist-user_avatar">
                <h2>${usr.name}</h2>
                <span style="background: rgba(${c.r}, ${c.g}, ${c.b}, 0.15);border: calc(var(--piv) * 1) solid ${usr.color};box-shadow: 0 0 calc(var(--piv) * 45) rgba(${c.r}, ${c.g}, ${c.b}, 0.55);">${usr.description}</span>
                <div class="ls__column_teamlist-user_other">
                    <b class="green" id="status-${index + 1}">online</b>
                </div>
            </div>
        `;
    }).join('');
};

// Render changelogs
const renderChangelogs = () => {
    if (!CHANGELOGS) return;
    
    CHANGELOGS.innerHTML = config.changelog.map(log => `
        <div class="ls__column_changelog-log">
            <h3>${log.title}</h3>
            <h2>${log.desc}</h2>
            <div class="ls__column_changelog-log_other"><hr></div>
        </div>
    `).join('');
};

// Setup background (video or image)
const setupBackground = () => {
    if (config.videoID && config.videoID !== 'none') {
        loadYouTubeAPI();
    } else {
        const lsElement = document.getElementById("ls");
        if (lsElement) lsElement.style.backgroundImage = `url(${config.backgroundImg})`;
    }
};

// Load YouTube API
function loadYouTubeAPI() {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

// Setup cursor
const setupCursor = () => {
    if (config.enableCursor) {
        $('#ls').append('<img id="cursor" src="./assets/img/media/cursor.png">');
        $(document).on('mousemove', function(e) {
            $('#cursor').css({top: e.pageY + 'px', left: e.pageX + 'px'});
        });
    }
};

function onYouTubeIframeAPIReady() {
    $('.ls').append(`
        <div id="youtube-player"></div>
    `);
    
    player = new YT.Player("youtube-player", {
        videoId: config.videoID,
        playerVars: {
            autoplay: 1,
            loop: 1,
            controls: 0,
            showinfo: 0,
            mute: config.muteVideo ? 1 : 0,
            playlist: config.videoID
        },
        events: {
            onReady: onPlayerReady,
        },
    });
}

function onPlayerReady(event) {
    event.target.playVideo();
    event.target.setVolume(config.defaultVideoVolume);
}

// Audio control functions
function playAudio(type) {
    if (type === 'custom') {
        AUDIO.play();
        AUDIO2.play();
    } else if (player) {
        player.unMute();
        player.playVideo();
    }
}

function stopAudio(type) {
    if (type === 'custom') {
        AUDIO.pause();
        AUDIO2.pause();
    } else if (player) {
        player.mute();
        if (config.stopVideowhenAudioisMuted) {
            player.pauseVideo();
        }
    }
}

// Toggle mute on spacebar press
document.addEventListener("keyup", function(event) {
    if (event.code === "Space") {
        muted = !muted;
        if (muted) {
            if (config.customMusic) stopAudio('custom');
            if (!config.muteVideo) stopAudio('yt');
        } else {
            if (config.customMusic) playAudio('custom');
            if (!config.muteVideo) playAudio('yt');
        }
    }
});

// Loading bar functions
const changeLoading = (num) => {
    const bar = document.getElementById("logobar");
    const loadingText = document.getElementById("loading-text");
    const loadingBar = document.getElementById("loading-bar");
    const transLogo = document.getElementById("transparent-logo");
    
    if (loadingText) loadingText.textContent = `${num}%`;
    if (loadingBar) loadingBar.style.width = `${num}%`;

    if (config.fillingEffect && bar) {
        bar.style.height = `${num / 2 + config.logoStart}%`;
    } else if (transLogo) {
        transLogo.style.opacity = "1.0";
    }
};

const loadingHandlers = {
    loadProgress: (data) => changeLoading(parseInt(data.loadFraction * 100))
};

window.addEventListener('message', (e) => {
    const handler = loadingHandlers[e.data.eventName];
    if (handler) handler(e.data);
});

// Social link info display
function showInfo(num) {
    if (config.showLinkInfowhileHovering) {
        $('.info-text').text(config.socials[num-1].link);
        $('.social-info-container').fadeIn(400).delay(2500).fadeOut(250);
    }
}

$('.social-info-container').hover(function() {
    $(this).stop(true, true).show();
});

// Copy text to clipboard
function copyText(text) {
    navigator.clipboard.writeText(text).then(() => {
        console.log('Text copied to clipboard');
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}

// Set team member status
window.addEventListener('DOMContentLoaded', () => {
    ['team1', 'team2', 'team3', 'team4'].forEach((team, index) => {
        const statusElement = document.getElementById(`status-${index + 1}`);
        if (statusElement && window.nuiHandoverData) {
            const status = window.nuiHandoverData[team];
            statusElement.textContent = status ? 'ONLINE' : 'OFFLINE';
            if (!status) {
                statusElement.style.color = 'red';
            }
        }
    });
});

// Initialize the page
init();

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Make onYouTubeIframeAPIReady global
window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
