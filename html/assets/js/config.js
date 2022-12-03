const config = {
    Logo: "./assets/img/filled-logo.png",
    logoStart: 34.5, // You may need to adjust this
    videoID: "gYO1uk7vIcc", // type none for static background
    defaultVideoVolume: 100,
    muteVideo: false, // Mutes the youtube Video
    stopVideowhenAudioisMuted: false, // Pauses the Video when the Audio is muted
    enableCursor: true, // Enable the Cursor
    showLinkInfowhileHovering: true, // Shows the Link Info while hovering
    //fillingEffect: false, // Filling effect
    // openLinkinBrowser: true, Disabled
    backgroundImg: "./assets/img/bg.png", // Only if the Video is disabled
    servername: "YOURNAME",
    serverdesc: 'Qui pariatur sit consequat et reprehenderit velit aute est elit.',
    socials: [
        {name: "discord", icon: "./assets/img/media/discord.png", link: "discord.gg/devine"},
        {name: "twitch", icon: "./assets/img/media/twitch.png", link: "twitch.tv/devine"},
        {name: "web", icon: "./assets/img/media/web.png", link: "devine.xyz"}
    ],
    teams: [
        {name: "Devine#0001", description: "Projektleitung", color: "#ffffff", image: "https://cdn.discordapp.com/attachments/959467970193670164/1013849547295953009/imageedit_3_6111944322.png"},
        {name: "Devine#0002", description: "Projektleitung", color: "#ffffff", image: "https://cdn.discordapp.com/attachments/959467970193670164/1013849547295953009/imageedit_3_6111944322.png"},
        {name: "Devine#0003", description: "Projektleitung", color: "#ffffff", image: "https://cdn.discordapp.com/attachments/959467970193670164/1013849547295953009/imageedit_3_6111944322.png"},
        {name: "Devine#0004", description: "Projektleitung", color: "#ffffff", image: "https://cdn.discordapp.com/attachments/959467970193670164/1013849547295953009/imageedit_3_6111944322.png"},
    ],
    changelog: [
        {title: "# YOUR UPDATE #", desc: "Description about update are here in few good cute words for our players should be displayed there, use it whatever you like its fine my friend, hehe keke"},
        {title: "# YOUR UPDATE #", desc: "Description about update are here in few good cute words for our players should be displayed there, use it whatever you like its fine my friend, hehe keke"},
        {title: "# YOUR UPDATE #", desc: "Description about update are here in few good cute words for our players should be displayed there, use it whatever you like its fine my friend, hehe keke"},
    ],

    customMusic: false, // Enable it if you want your own Music (!!ENABLE muteVideo)
    songDirectory: './assets/music/song.mp3' // Directory where youre song is
}

/*
    How to get the Youtube ID:

    -Copy your Youtube Link (https://www.youtube.com/watch?v=dQw4w9WgXcQ)
    -Delete everything befor v= (dQw4w9WgXcQ)
    
    Here you go, you have your Video ID
*/