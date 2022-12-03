function ExtractIdentifers(table)
    local steam = nil
    local license = nil
    local discord = nil

    for k, v in pairs(table) do
        if string.sub(v, 1, string.len('steam:')) == "steam:" then
            steam = v
        end
        if string.sub(v, 1, string.len('license:')) == "license:" then
            license = string.gsub(v, "license:", "")
        end
        if string.sub(v, 1, string.len('discord:')) == "discord:" then
            discord = string.gsub(v, "discord:", "")
        end
    end

    return steam, license, discord
end

AddEventHandler('playerConnecting', function(_, _, deferrals)
    local jsRequest = {false, false, false, false}

    for k, v in pairs(GetPlayers()) do
        local steam, license, discord = ExtractIdentifers(GetPlayerIdentifiers(v))

        for k, v in pairs(Config.Team) do
            if v.identifierType == "steam" then
                if steam ~= nil then
                    if steam == v.identifier then
                        jsRequest[k] = true
                    end
                end
            elseif v.identifierType == "license" then
                if license ~= nil then
                    if license == v.identifier then
                        jsRequest[k] = true
                    end
                end
            elseif v.identifierType == "discord" then
                if discord ~= nil then
                    if discord == v.identifier then
                        jsRequest[k] = true
                    end
                end
            else
                print('^1[ERROR]^0 Invalid Identifer Type ' .. v.identifier)
            end
        end
    end

    if jsRequest[1] ~= nil and jsRequest[2] ~= nil and jsRequest[3] ~= nil and jsRequest[4] ~= nil then
        deferrals.handover({
            team1 = jsRequest[1],
            team2 = jsRequest[2],
            team3 = jsRequest[3],
            team4 = jsRequest[4]
        })
    end
end)
