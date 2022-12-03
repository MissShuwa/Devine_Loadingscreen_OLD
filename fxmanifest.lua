fx_version 'cerulean'
lua54 'yes'
game 'gta5'

author 'Devine'
description 'Devine Loadingscreen OLD'
version '1.1.1'

client_scripts { 'client.lua' }
server_scripts { 'server.lua' }
shared_scripts { 'config.lua' }
loadscreen_cursor 'yes'
loadscreen 'html/index.html'
files {
    'html/assets/akrobat/*',
    'html/assets/css/*',
    'html/assets/Gilroy/*',
    'html/assets/img/*',
    'html/assets/img/media/*',
    'html/assets/js/*',
    'html/assets/music/*',
    'html/index.html'
}

escrow_ignore { 'config.lua' }