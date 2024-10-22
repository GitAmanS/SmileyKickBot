const { Telegraf } = require('telegraf');
require('dotenv').config(); // Load environment variables from .env file

// Get bot token from .env
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

// Listen for new members joining the group
bot.on('new_chat_members', (ctx) => {
    const newMembers = ctx.message.new_chat_members;

    newMembers.forEach((newMember) => {
        const chatId = ctx.chat.id;
        const userId = newMember.id;
        const userFullName = `${newMember.first_name || ''} ${newMember.last_name || ''}`.trim();

        console.log(`New member ${userFullName} joined the group.`);

        // Ban the new member
        ctx.banChatMember(userId)
            .then(() => {
                // Send a message to the group that the user has been banned
                ctx.replyWithMarkdown(`oye pagal [${userFullName}](tg://user?id=${userId}) wapis mat ana, samjha.`);
                console.log(`Banned user ${userId} from group ${chatId}`);
            })
            .catch((error) => {
                console.error(`Failed to ban user ${userId}:`, error);
            });
    });
});

// Start the bot
bot.launch();

console.log('Bot is running...');
