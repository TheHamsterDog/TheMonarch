
const config = require('config');
const Discord = require('discord.js');
const client = new Discord.Client();
import express = require('express');
import axios from 'axios';
const app: any = express();
const checker = require("noswearing");
const arrayofJokes = ['Are you an idiot? Go get a job', 'Swearing is bad for kids, son', 'You\'re so dumb, even your momma calls you dumb ', 'Were your mom and dad siblings?', 'Who the heck do you think you are? a clown is the correct answer', 'Ah, I don\'t complain about you being dumb, that\'s your parent\'s job '];
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('up and running!'));
app.get('/', (req, res) => {
    res.send('up and running!')
    //it is really necessary to keep a server running, if you are thinking of hosting a discord bot on services like herkoku...
    //To keep the bot live at all times, you need to ping the server once every 5 mins.
})
client.on('message', async msg => {
    try {


        const swear: any = checker(msg.content);
        if (!msg.deleted) {
            if (swear) {
                if (swear[0].deviations < 3 && msg.member.id !== '800415163147616297') {
                    console.log(msg.member.id);
                    if (msg.member.hasPermission('KICK_MEMBERS')) {
                        console.log('This member can kick');
                        // await msg.delete();
                        return (await msg.reply('My Lord, I know that you are above everyone, but please avoid swearing'));
                    }
                    console.log('swear');
                    await msg.delete();
                    const insult = await axios.get("https://evilinsult.com/generate_insult.php?lang=en&type=json")
                    console.log(insult.data.insult);
                    return (await msg.reply(`${insult.data.insult}`));
                }
            }
        }
        const random = Math.round(Math.random() * 4);
        console.log(random);
        if (random === 4 && msg.member.id !== '800415163147616297' && !msg.member.hasPermission('KICK_MEMBERS')) {
            const insult = await axios.get("https://evilinsult.com/generate_insult.php?lang=en&type=json")
            console.log(insult.data.insult);
            return (await msg.reply(`${insult.data.insult}`));
        }
        if (random === 4 && msg.member.id !== '800415163147616297' && msg.member.hasPermission('KICK_MEMBERS')) {
            const compliment = await axios.get("https://complimentr.com/api")
            console.log(compliment.data.compliment)
            return (await msg.reply(`${compliment.data.compliment}`));
        }
        if (msg.content.toLowerCase() === ('my king, are you alive?')) {
            return (msg.reply('Yes, I am alive, my fellow servant!'));
        }
        if (msg.content.toLowerCase().includes('my king')) {
            return (msg.reply('You mentioned me, but didn\'t give me valid command! Please Try again or Leave me the heck alone!'));
        }
    }
    catch (err) {
        console.log(err.message);
    }
});
client.login(config.get('discord'));