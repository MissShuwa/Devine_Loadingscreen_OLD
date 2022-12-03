Citizen.CreateThread(function()
    if Config.EnableJoinTransition then
        local cloudOpacity = 0.01
        local muteSound = true
        
        function ToggleSound(state)
            if state then
                StartAudioScene("MP_LEADERBOARD_SCENE");
            else
                StopAudioScene("MP_LEADERBOARD_SCENE");
            end
        end
        
        
        function InitialSetup()
            SetManualShutdownLoadingScreenNui(true)
            ToggleSound(muteSound)
            if not IsPlayerSwitchInProgress() then
                SwitchOutPlayer(PlayerPedId(), 0, 1)
            end
        end
        
        function ClearScreen()
            SetCloudHatOpacity(cloudOpacity)
            HideHudAndRadarThisFrame()
            
        
            SetDrawOrigin(0.0, 0.0, 0.0, 0)
        end
        
        
        InitialSetup()
        
        
        Citizen.CreateThread(function()
        
        
            InitialSetup()
        
            while GetPlayerSwitchState() ~= 5 do
                Citizen.Wait(0)
                ClearScreen()
            end
            
        
            ShutdownLoadingScreen()
            
            ClearScreen()
            Citizen.Wait(0)
            DoScreenFadeOut(0)
            
            ShutdownLoadingScreenNui()
            
            ClearScreen()
            Citizen.Wait(0)
            ClearScreen()
            DoScreenFadeIn(500)
            while not IsScreenFadedIn() do
                Citizen.Wait(0)
                ClearScreen()
            end
            
            local timer = GetGameTimer()
            
            ToggleSound(false)
            
            while true do
                ClearScreen()
                Citizen.Wait(0)
                
                if GetGameTimer() - timer > 5000 then
                    SwitchInPlayer(PlayerPedId())
                    ClearScreen()
                    while GetPlayerSwitchState() ~= 12 do
                        Citizen.Wait(0)
                        ClearScreen()
                    end
        
                    break
                end
            end
        
            ClearDrawOrigin()
        end)
    else
        return       
    end
end)
