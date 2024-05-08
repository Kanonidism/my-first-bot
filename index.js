const Discord = require("discord.js");
 
const client = new Discord.Client({
    intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "MESSAGE_CONTENT"],
    partials: ["CHANNEL", "MESSAGE"]
});
 
const token = ("MTIyOTE2NDk0ODgzNjQ1MDM3NA.GGhr8b.Mh6nPXzVbmEaKsiGvr6HkvVPUfLbcf9KEwSsfU") // your bot token here
 
client.on('ready', async () => {
    console.log(`Client has been initiated! ${client.user.username}`)
});
 
client.on('messageCreate', async (message) => {
    if (message.content.toLowerCase() === "test") {
        message.reply("Test successful!");
    }
});
 
const { MessageEmbed } = require('discord.js');

client.on('messageCreate', async message => {
    if (!message.content.startsWith('!')) return;
    const args = message.content.slice('!'.length).split(/ +/);
    const command = args.shift().toLowerCase();
    if (command === 'say') {
        if (!message.member.permissions.has('ADMINISTRATOR')) return await message.reply({ content: 'Missing permissions' });

        const text = args.join(' ');
        if (!text) return await message.reply({ content: 'Put what you want to say' });

        const embed = new MessageEmbed()
            .setColor('BLUE')
            .setDescription(text);

        await message.channel.send({ embeds: [embed] });
    }
});

client.on('messageCreate', async message => {
    if (!message.content.startsWith('!')) return;
    const args = message.content.slice('!'.length).split(/ +/);
    const command = args.shift().toLowerCase();
    if (command === 'avatar') {
        if (!message.member.permissions.has('ADMINISTRATOR')) return await message.reply({ content: `Missing Permissions`});
        const avatar_url = args[0];
        if (!avatar_url) return await message.reply({ content: `Please put a url (animated or static)`});
        if (!avatar_url.startsWith('https') && !avatar_url.startsWith('http')) return await message.reply({ content: `Not a link` });
        await client.user.setAvatar(avatar_url).then(() => {
            message.channel.send({ content: `Set`});
        }).catch(err => {
            return message.channel.send({ content: `Error setting the avatar`})
        })
    }
})

client.on('messageCreate', async message => {
    if (!message.content.startsWith('!')) return;
    const args = message.content.slice('!'.length).split(/ +/);
    const command = args.shift().toLowerCase();
    try {
      if (command === 'userinfo') {
        const targetUser = message.mentions.users.first() || message.author;
        const userInfoEmbed = new MessageEmbed()
          .setColor('BLUE')
          .setDescription(`**User Information:**\n\n` +
            `**Tag:** ${targetUser.tag}\n` +
            `**Username:** ${targetUser.username}\n` +
            `**User ID:** \`\`${targetUser.id}\`\`\n` +
            `**Created At:** ${targetUser.createdAt.toDateString()}\n` +
            `**Joined At:** ${message.guild.members.cache.get(targetUser.id).joinedAt.toDateString()}`);
        message.channel.send({ embeds: [userInfoEmbed] });
      }
    } catch (error) {
      console.error(error);
    }
  });

  client.on('messageCreate', async message => {
    if (!message.content.startsWith('!')) return;
    const args = message.content.slice('!'.length).split(/ +/);
    const command = args.shift().toLowerCase();
    if (command === 'clear') {
      const amount = parseInt(args[0]);
  
      if (isNaN(amount)) {
        return await message.reply({ content: `**Βάλε μόνο αριθμόυς!**` });
      } else if (amount < 1 || amount > 100) {
        return await message.reply({ content: `**Βάλε μόνο έναν αριθμό απο το 1-100!**` });
      }
  
      try {
        const messages = await message.channel.messages.fetch({ limit: amount });
  
        const res = new MessageEmbed()
          .setColor('BLUE')
          .setDescription(`**Έγιναν delete ${messages.size} μυνήματα**`);
  
        await message.channel.bulkDelete(amount, true);
        const msg = await message.channel.send({ embeds: [res] });
  
        setTimeout(() => {
          msg.delete();
        }, 2000);
      } catch (error) {
        return console.log(error);
      }
    }
  });

  client.login(token);