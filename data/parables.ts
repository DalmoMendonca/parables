export interface Parable {
  id: string;
  title: string;
  slug: string;
  imageUrl: string;
  gospels: {
    matthew?: string;
    mark?: string;
    luke?: string;
    john?: string;
  };
  texts: {
    ESV: { [gospel: string]: string };
    KJV: { [gospel: string]: string };
    NIV: { [gospel: string]: string };
  };
  notes?: {
    magenta: string;
    red: string;
    amber: string;
    orange: string;
    green: string;
    teal: string;
    turquoise: string;
  };
}

export const parables: Parable[] = [
{
  "id": "1",
  "title": "New Wine into Old Wineskins",
  "slug": "new-wine-into-old-wineskins",
  "imageUrl": "/assets/1_new_wine_into_old_wineskins.png",
  "gospels": {
  "matthew": "9:16–17",
  "mark": "2:21–22",
  "luke": "5:37–39"
},
  "texts": {
  "ESV": {
    "matthew": "No one puts a piece of unshrunk cloth on an old garment, for the patch tears away from the garment, and a worse tear is made. Neither is new wine put into old wineskins. If it is, the skins burst and the wine is spilled and the skins are destroyed. But new wine is put into fresh wineskins, and so both are preserved.",
    "mark": "No one sews a piece of unshrunk cloth on an old garment. If he does, the patch tears away from it, the new from the old, and a worse tear is made. And no one puts new wine into old wineskins. If he does, the wine will burst the skins—and so the wine is destroyed, and the skins too. But new wine is for fresh wineskins.",
    "luke": "And no one puts new wine into old wineskins. If he does, the new wine will burst the skins and it will be spilled, and the skins will be destroyed. But new wine must be put into fresh wineskins. And no one after drinking old wine desires new, for he says, ‘The old is good.’"
  },
  "KJV": {
    "matthew": "No man putteth a piece of new cloth unto an old garment, for that which is put in to fill it up taketh from the garment, and the rent is made worse. Neither do men put new wine into old bottles: else the bottles break, and the wine runneth out, and the bottles perish: but they put new wine into new bottles, and both are preserved.",
    "mark": "No man also seweth a piece of new cloth on an old garment: else the new piece that filled it up taketh away from the old, and the rent is made worse. And no man putteth new wine into old bottles: else the new wine doth burst the bottles, and the wine is spilled, and the bottles will be marred: but new wine must be put into new bottles.",
    "luke": "And no man putteth new wine into old bottles; else the new wine will burst the bottles, and be spilled, and the bottles shall perish. But new wine must be put into new bottles; and both are preserved. No man also having drunk old wine straightway desireth new: for he saith, The old is better."
  },
  "NIV": {
    "matthew": "No one sews a patch of unshrunk cloth on an old garment, for the patch will pull away from the garment, making the tear worse. Neither do people pour new wine into old wineskins. If they do, the skins will burst, the wine will run out and the wineskins will be ruined. No, they pour new wine into new wineskins, and both are preserved.",
    "mark": "No one sews a patch of unshrunk cloth on an old garment. Otherwise, the new patch will pull away from the old, making the tear worse. And no one pours new wine into old wineskins. Otherwise, the wine will burst the skins, and both the wine and the wineskins will be ruined. No, new wine must be poured into new wineskins.",
    "luke": "And no one pours new wine into old wineskins. Otherwise, the new wine will burst the skins, the wine will run out and the wineskins will be ruined. No, new wine must be poured into new wineskins. And no one after drinking old wine wants the new, for they say, ‘The old is better.’"
  }
},
  "notes": {
  "magenta": "",
  "red": "",
  "amber": "",
  "orange": "",
  "green": "",
  "teal": "",
  "turquoise": ""
}
},
{
  "id": "2",
  "title": "The Strong Man",
  "slug": "the-strong-man",
  "imageUrl": "/assets/2_the_strong_man.png",
  "gospels": {
  "matthew": "12:29",
  "mark": "3:27",
  "luke": "11:21–22"
},
  "texts": {
  "ESV": {
    "matthew": "Or how can someone enter a strong man's house and plunder his goods, unless he first binds the strong man? Then indeed he may plunder his house.",
    "mark": "But no one can enter a strong man's house and plunder his goods, unless he first binds the strong man. Then indeed he may plunder his house.",
    "luke": "When a strong man, fully armed, guards his own palace, his goods are safe; but when one stronger than he attacks him and overcomes him, he takes away his armor in which he trusted and divides his spoil."
  },
  "KJV": {
    "matthew": "Or else how can one enter into a strong man’s house, and spoil his goods, except he first bind the strong man? and then he will spoil his house.",
    "mark": "No man can enter into a strong man's house, and spoil his goods, except he will first bind the strong man; and then he will spoil his house.",
    "luke": "When a strong man armed keepeth his palace, his goods are in peace: But when a stronger than he shall come upon him, and overcome him, he taketh from him all his armour wherein he trusted, and divideth his spoils."
  },
  "NIV": {
    "matthew": "\"Or again, how can anyone enter a strong man’s house and carry off his possessions unless he first ties up the strong man? Then he can plunder his house.\"",
    "mark": "“No one can enter a strong man’s house and plunder his goods, unless he first ties up the strong man; then indeed he may plunder his house.\"",
    "luke": "When a strong man, fully armed, guards his own house, his possessions are safe. But when someone stronger attacks and overcomes him, he takes away the armor in which the man trusted and divides up his plunder."
  }
},
  "notes": {
  "magenta": "",
  "red": "",
  "amber": "",
  "orange": "",
  "green": "",
  "teal": "",
  "turquoise": ""
}
},
{
  "id": "3",
  "title": "The Sower",
  "slug": "the-sower",
  "imageUrl": "/assets/3_the_sower.png",
  "gospels": {
  "matthew": "13:3–9",
  "mark": "4:3–9",
  "luke": "8:5–8"
},
  "texts": {
  "ESV": {
    "matthew": "A sower went out to sow. And as he sowed, some seeds fell along the path, and the birds came and devoured them. Other seeds fell on rocky ground, where they did not have much soil, and immediately they sprang up, since they had no depth of soil, but when the sun rose they were scorched, and since they had no root, they withered away. Other seeds fell among thorns, and the thorns grew up and choked them. Other seeds fell on good soil and produced grain, some a hundredfold, some sixty, some thirty. He who has ears, let him hear.",
    "mark": "“Listen! Behold, a sower went out to sow. And as he sowed, some seed fell along the path, and the birds came and devoured it. Other seed fell on rocky ground, where it did not have much soil, and immediately it sprang up, since it had no depth of soil. And when the sun rose, it was scorched, and since it had no root, it withered away. Other seed fell among thorns, and the thorns grew up and choked it, and it yielded no grain. And other seeds fell into good soil and produced grain, growing up and increasing and yielding thirtyfold and sixtyfold and a hundredfold.” And he said, “He who has ears to hear, let him hear.”",
    "luke": "A sower went out to sow his seed. And as he sowed, some fell along the path and was trampled underfoot, and the birds of the air devoured it. And some fell on the rock, and as it grew up, it withered away, because it had no moisture. And some fell among thorns, and the thorns grew up with it and choked it. And some fell into good soil and grew and yielded a hundredfold. As he said these things, he called out, “He who has ears to hear, let him hear.”"
  },
  "KJV": {
    "matthew": "And he spake many things unto them in parables, saying, Behold, a sower went forth to sow; And when he sowed, some seeds fell by the way side, and the fowls came and devoured them up: Some fell upon stony places, where they had not much earth: and forthwith they sprung up, because they had no deepness of earth: And when the sun was up, they were scorched; and because they had no root, they withered away. And some fell among thorns; and the thorns sprung up, and choked them: But other fell into good ground, and brought forth fruit, some an hundredfold, some sixtyfold, some thirtyfold. Who hath ears to hear, let him hear.",
    "mark": "Hearken; Behold, there went out a sower to sow: And it came to pass, as he sowed, some fell by the way side, and the fowls of the air came and devoured it up. And some fell on stony ground, where it had not much earth; and immediately it sprang up, because it had no depth of earth: But when the sun was risen, it was scorched; and because it had no root, it withered away. And some fell among thorns, and the thorns grew up, and choked it, and it yielded no fruit. And other fell on good ground, and did yield fruit that sprang up and increased; and brought forth, some thirty, and some sixty, and some an hundred. And he said unto them, He that hath ears to hear, let him hear.",
    "luke": "A sower went out to sow his seed: and as he sowed, some fell by the way side; and it was trodden down, and the fowls of the air devoured it. And some fell upon a rock; and as soon as it was sprung up, it withered away, because it lacked moisture. And some fell among thorns; and the thorns sprang up with it, and choked it. And other fell on good ground, and sprang up, and bare fruit an hundredfold. And when he had said these things, he cried, He that hath ears to hear, let him hear."
  },
  "NIV": {
    "matthew": "Then he told them many things in parables, saying: “A farmer went out to sow his seed. As he was scattering the seed, some fell along the path, and the birds came and ate it up. Some fell on rocky places, where it did not have much soil. It sprang up quickly, because the soil was shallow. But when the sun came up, the plants were scorched, and they withered because they had no root. Other seed fell among thorns, which grew up and choked the plants. Still other seed fell on good soil, where it produced a crop—a hundred, sixty or thirty times what was sown. Whoever has ears, let them hear.”",
    "mark": "“Listen! A farmer went out to plant some seed. As he was scattering the seed, some fell along the path, and the birds came and ate it up. Some fell on rocky places, where it did not have much soil. It sprang up quickly, because the soil was shallow. But when the sun came up, the plants were scorched, and they withered because they had no root. Other seed fell among thorns, which grew up and choked the plants, so that they did not bear grain. Still other seed fell on good soil. It came up, grew and produced a crop, some multiplying thirty, some sixty, some a hundred times.”Then Jesus said, “Whoever has ears to hear, let them hear.”",
    "luke": "“A farmer went out to sow his seed. As he was scattering the seed, some fell along the path; it was trampled on, and the birds ate it up. Some fell on rocky ground, and when it came up, the plants withered because they had no moisture. Other seed fell among thorns, which grew up with it and choked the plants. Still other seed fell on good soil. It came up and yielded a crop, a hundred times more than was sown.” When he said this, he called out, “Whoever has ears to hear, let them hear.”"
  }
},
"notes": {
  "magenta": "",
  "red": "",
  "amber": "",
  "orange": "",
  "green": "",
  "teal": "",
  "turquoise": ""
}
},
{
  "id": "4",
  "title": "The Lamp Under a Bushel",
  "slug": "the-lamp-under-a-bushel",
  "imageUrl": "/assets/4_the_lamp_under_a_bushel.png",
  "gospels": {
  "matthew": "5:14–15",
  "mark": "4:21–25",
  "luke": "8:16–18"
},
  "texts": {
  "ESV": {
    "matthew": "You are the light of the world. A city set on a hill cannot be hidden. Nor do people light a lamp and put it under a basket, but on a stand, and it gives light to all in the house.",
    "mark": "And he said to them, “Is a lamp brought in to be put under a basket, or under a bed, and not on a stand? For nothing is hidden except to be made manifest; nor is anything secret except to come to light. If anyone has ears to hear, let him hear.” And he said to them, “Pay attention to what you hear: with the measure you use, it will be measured to you, and still more will be added to you. For to the one who has, more will be given, and from the one who has not, even what he has will be taken away.”",
    "luke": "No one after lighting a lamp covers it with a jar or puts it under a bed, but puts it on a stand, so that those who enter may see the light. For nothing is hidden that will not be made manifest, nor is anything secret that will not be known and come to light. Take care then how you hear, for to the one who has, more will be given, and from the one who has not, even what he thinks that he has will be taken away."
  },
  "KJV": {
    "matthew": "Ye are the light of the world. A city that is set on an hill cannot be hid. Neither do men light a candle, and put it under a bushel, but on a candlestick; and it giveth light unto all that are in the house.",
    "mark": "And he said unto them, Is a candle brought to be put under a bushel, or under a bed? and not to be set on a candlestick? For there is nothing hid, which shall not be manifested; neither was any thing kept secret, but that it should come abroad. If any man have ears to hear, let him hear. And he said unto them, Take heed what ye hear: with what measure ye mete, it shall be measured to you: and unto you that hear shall more be given. For he that hath, to him shall be given: and he that hath not, from him shall be taken even that which he hath.",
    "luke": "No man, when he hath lighted a candle, covereth it with a vessel, or putteth it under a bed; but setteth it on a candlestick, that they which enter in may see the light. For nothing is secret, that shall not be made manifest; neither any thing hid, that shall not be known and come abroad. Take heed therefore how ye hear: for whosoever hath, to him shall be given; and whosoever hath not, from him shall be taken even that which he seemeth to have."
  },
  "NIV": {
    "matthew": "You are the light of the world. A town built on a hill cannot be hidden. Neither do people light a lamp and put it under a bowl. Instead they put it on its stand, and it gives light to everyone in the house.",
    "mark": "He said to them, \"Do you bring in a lamp to put it under a bowl or a bed? Instead, don't you put it on its stand? Because everything hidden will be disclosed, and everything concealed will be brought into the open. If anyone has ears to hear, let them hear.\" \"Consider carefully what you hear,\" he continued. \"With the measure you use, it will be measured to you—and even more. Whoever has will be given more; whoever does not have, even what they have will be taken from them.\"",
    "luke": "\"No one lights a lamp and hides it in a clay jar or puts it under a bed. Instead, they put it on a stand so that those who come in can see the light. For there is nothing hidden that will not be disclosed, and nothing concealed that will not be known or brought out into the open. Therefore consider carefully how you listen. Whoever has will be given more; whoever does not have, even what they think they have will be taken from them.”"
  }
},
  "notes": {
  "magenta": "",
  "red": "",
  "amber": "",
  "orange": "",
  "green": "",
  "teal": "",
  "turquoise": ""
}
},
{
  "id": "5",
  "title": "The Mustard Seed",
  "slug": "the-mustard-seed",
  "imageUrl": "/assets/5_the_mustard_seed.png",
  "gospels": {
  "matthew": "13:31–32",
  "mark": "4:30–32",
  "luke": "13:18–19"
},
  "texts": {
  "ESV": {
    "matthew": "He put another parable before them, saying, “The kingdom of heaven is like a mustard seed that a man took and sowed in his field. It is the smallest of all seeds, but when it has grown it is larger than all the garden plants and becomes a tree, so that the birds of the air come and make nests in its branches.”",
    "mark": "And he said, “With what can we compare the kingdom of God, or what parable shall we use for it? It is like a mustard seed, which, when sown on the ground, is the smallest of all the seeds on earth, yet when it is sown it grows up and becomes larger than all the garden plants and puts out large branches, so that the birds of the air can make nests in its shade.”",
    "luke": "He said therefore, “What is the kingdom of God like? And to what shall I compare it? It is like a grain of mustard seed that a man took and sowed in his garden, and it grew and became a tree, and the birds of the air made nests in its branches.”"
  },
  "KJV": {
    "matthew": "Another parable put he forth unto them, saying, The kingdom of heaven is like to a grain of mustard seed, which a man took, and sowed in his field: Which indeed is the least of all seeds: but when it is grown, it is the greatest among herbs, and becometh a tree, so that the birds of the air come and lodge in the branches thereof.",
    "mark": "And he said, Whereunto shall we liken the kingdom of God? or with what comparison shall we compare it? It is like a grain of mustard seed, which, when it is sown in the earth, is less than all the seeds that be in the earth: But when it is sown, it groweth up, and becometh greater than all herbs, and shooteth out great branches; so that the fowls of the air may lodge under the shadow of it.",
    "luke": "Then said he, Unto what is the kingdom of God like? and whereunto shall I resemble it? It is like a grain of mustard seed, which a man took, and cast into his garden; and it grew, and waxed a great tree; and the fowls of the air lodged in the branches of it."
  },
  "NIV": {
    "matthew": "He told them another parable: “The kingdom of heaven is like a mustard seed, which a man took and planted in his field. Though it is the smallest of all seeds, yet when it grows, it is the largest of garden plants and becomes a tree, so that the birds come and perch in its branches.”",
    "mark": "He also said, “What shall we say the kingdom of God is like, or what parable shall we use to describe it? It is like a mustard seed, which is the smallest of all seeds on earth. Yet when planted, it grows and becomes the largest of all garden plants, with such big branches that the birds can perch in its shade.”",
    "luke": "Then Jesus asked, \"What is the kingdom of God like? What shall I compare it to? It is like a mustard seed, which a man took and planted in his garden. It grew and became a tree, and the birds of the air perched in its branches.\""
  }
},
  "notes": {
  "magenta": "",
  "red": "",
  "amber": "",
  "orange": "",
  "green": "",
  "teal": "",
  "turquoise": ""
}
},
{
  "id": "6",
  "title": "The Wicked Husbandmen",
  "slug": "the-wicked-husbandmen",
  "imageUrl": "/assets/6_the_wicked_husbandmen.png",
  "gospels": {
  "matthew": "21:33–41",
  "mark": "12:1–9",
  "luke": "20:9–16"
},
  "texts": {
  "ESV": {
    "matthew": "Hear another parable. There was a master of a house who planted a vineyard and put a fence around it and dug a winepress in it and built a tower and leased it to tenants and went into another country. When the season for fruit drew near, he sent his servants to the tenants to get his fruit. And the tenants took his servants and beat one, killed another, and stoned another. Again he sent other servants, more than the first, and they did the same to them. Finally he sent his son to them, saying, ‘They will respect my son.’ But when the tenants saw the son, they said to themselves, ‘This is the heir. Come, let us kill him and have his inheritance.’ And they took him and threw him out of the vineyard and killed him. When therefore the owner of the vineyard comes, what will he do to those tenants?” They said to him, “He will put those wretches to a miserable death and let out the vineyard to other tenants who will give him the fruits in their seasons.”",
    "mark": "And he began to speak to them in parables. “A man planted a vineyard and put a fence around it and dug a pit for the winepress and built a tower, and leased it to tenants and went into another country. When the season came, he sent a servant to the tenants to get from them some of the fruit of the vineyard. And they took him and beat him and sent him away empty-handed. Again he sent to them another servant, and they struck him on the head and treated him shamefully. And he sent another, and him they killed. And so with many others: some they beat, and some they killed. He had still one other, a beloved son. Finally he sent him to them, saying, ‘They will respect my son.’ But those tenants said to one another, ‘This is the heir. Come, let us kill him, and the inheritance will be ours.’ And they took him and killed him and threw him out of the vineyard. What will the owner of the vineyard do? He will come and destroy the tenants and give the vineyard to others.”",
    "luke": "And he began to tell the people this parable: “A man planted a vineyard and let it out to tenants and went into another country for a long while. When the time came, he sent a servant to the tenants, so that they would give him some of the fruit of the vineyard. But the tenants beat him and sent him away empty-handed. And he sent another servant. But they also beat and treated him shamefully, and sent him away empty-handed. And he sent yet a third. This one also they wounded and cast out. Then the owner of the vineyard said, ‘What shall I do? I will send my beloved son; perhaps they will respect him.’ But when the tenants saw him, they said to themselves, ‘This is the heir. Let us kill him, so that the inheritance may be ours.’ And they threw him out of the vineyard and killed him. What then will the owner of the vineyard do to them? He will come and destroy those tenants and give the vineyard to others.” When they heard this, they said, “Surely not!”"
  },
  "KJV": {
    "matthew": "Hear another parable: There was a certain householder, which planted a vineyard, and hedged it round about, and digged a winepress in it, and built a tower, and let it out to husbandmen, and went into a far country. And when the time of the fruit drew near, he sent his servants to the husbandmen, that they might receive the fruits of it. And the husbandmen took his servants, and beat one, and killed another, and stoned another. Again, he sent other servants more than the first: and they did unto them likewise. But last of all he sent unto them his son, saying, They will reverence my son. But when the husbandmen saw the son, they said among themselves, This is the heir; come, let us kill him, and let us seize on his inheritance. And they caught him, and cast him out of the vineyard, and slew him. When the lord therefore of the vineyard cometh, what will he do unto those husbandmen? They say unto him, He will miserably destroy those wicked men, and will let out his vineyard unto other husbandmen, which shall render him the fruits in their seasons.",
    "mark": "And he began to speak unto them by parables. A certain man planted a vineyard, and set an hedge about it, and digged a place for the winepress, and built a tower, and let it out to husbandmen, and went into a far country. And at the season he sent to the husbandmen a servant, that he might receive from the husbandmen of the fruit of the vineyard. And they caught him, and beat him, and sent him away empty. And again he sent unto them another servant; and at him they cast stones, and wounded him in the head, and sent him away shamefully handled. And again he sent a third; and him they killed, and many others; some they beat, and some they killed. Having yet therefore one son, his wellbeloved, he sent him also last unto them, saying, They will reverence my son. But those husbandmen said among themselves, This is the heir; come, let us kill him, and the inheritance shall be ours. And they took him, and killed him, and cast him out of the vineyard. What shall therefore the lord of the vineyard do? he will come and destroy the husbandmen, and will give the vineyard unto others.",
    "luke": "A certain man planted a vineyard, and let it forth to husbandmen, and went into a far country for a long time. And at the season he sent a servant to the husbandmen, that they should give him of the fruit of the vineyard: but the husbandmen beat him, and sent him away empty. And again he sent another servant: and they beat him also, and entreated him shamefully, and sent him away empty. And again he sent a third: and they wounded him also, and cast him out. Then said the lord of the vineyard, What shall I do? I will send my beloved son: it may be they will reverence him when they see him. But when the husbandmen saw him, they reasoned among themselves, saying, This is the heir: come, let us kill him, that the inheritance may be ours. So they cast him out of the vineyard, and killed him. What therefore shall the lord of the vineyard do unto them? He shall come and destroy these husbandmen, and shall give the vineyard to others. And when they heard it, they said, God forbid."
  },
  "NIV": {
    "matthew": "“Listen to another parable: There was a landowner who planted a vineyard. He put a wall around it, dug a winepress in it and built a watchtower. Then he rented the vineyard to some farmers and moved to another place. When harvest time approached, he sent his servants to the tenants to collect his fruit. The tenants seized his servants; they beat one, killed another, and stoned a third. Then he sent other servants to them, more than the first time, and the tenants treated them the same way. Last of all, he sent his son to them. ‘They will respect my son,’ he said. But when the tenants saw the son, they said to each other, ‘This is the heir. Come, let’s kill him and take his inheritance.’ So they took him and threw him out of the vineyard and killed him. Therefore, when the owner of the vineyard comes, what will he do to those tenants?” “He will bring those wretches to a wretched end,” they replied, “and he will rent the vineyard to other tenants, who will give him his share of the crops at harvest time.”",
    "mark": "He then began to speak to them in parables: “A man planted a vineyard. He put a wall around it, dug a winepress and built a watchtower. Then he rented it to some farmers and moved to another place. At harvest time he sent his servant to the tenants to collect from them his share of the fruit of the vineyard. But they seized him, beat him and sent him away empty-handed. Then he sent another servant to them; this one they beat over the head and treated shamefully. He sent still another, and that one they killed. He sent many others; some they beat, others they killed. He had one left to send, a son, whom he loved. He sent him last of all, saying, ‘They will respect my son.’ But the tenants said to one another, ‘This is the heir. Come, let’s kill him, and the inheritance will be ours.’ So they took him and killed him, and threw him out of the vineyard. What then will the owner of the vineyard do? He will come and kill those tenants and give the vineyard to others.\"",
    "luke": "He went on to tell the people this parable: “A man planted a vineyard, rented it to some farmers and went away for a long time. At harvest time he sent a servant to the tenants so they would give him some of the fruit of the vineyard. But the tenants beat him and sent him away empty-handed. He sent another servant, but that one also they beat and treated shamefully and sent away empty-handed. He sent still a third, and they wounded him and threw him out.\n\n“Then the owner of the vineyard said, ‘What shall I do? I will send my son, whom I love; perhaps they will respect him.’\n\n“But when the tenants saw him, they talked the matter over. ‘This is the heir,’ they said. ‘Let’s kill him, and the inheritance will be ours.’ So they threw him out of the vineyard and killed him.\n\n“What then will the owner of the vineyard do to them? He will come and kill those tenants and give the vineyard to others.”\n\nWhen the people heard this, they said, “God forbid!”"
  }
},
  "notes": {
  "magenta": "",
  "red": "",
  "amber": "",
  "orange": "",
  "green": "",
  "teal": "",
  "turquoise": ""
}
},
{
  "id": "7",
  "title": "The Budding Fig Tree",
  "slug": "the-budding-fig-tree",
  "imageUrl": "/assets/7_the_budding_fig_tree.png",
  "gospels": {
  "matthew": "24:32–35",
  "mark": "13:28–31",
  "luke": "21:29–33"
},
  "texts": {
  "ESV": {
    "matthew": "From the fig tree learn its lesson: as soon as its branch becomes tender and puts out its leaves, you know that summer is near. So also, when you see all these things, you know that he is near, at the very gates. Truly, I say to you, this generation will not pass away until all these things take place. Heaven and earth will pass away, but my words will not pass away.",
    "mark": "From the fig tree learn its lesson: as soon as its branch becomes tender and puts out its leaves, you know that summer is near. So also, when you see these things taking place, you know that he is near, at the very gates. Truly, I say to you, this generation will not pass away until all these things take place. Heaven and earth will pass away, but my words will not pass away.",
    "luke": "Look at the fig tree, and all the trees. As soon as they come out in leaf, you see for yourselves and know that the summer is already near. So also, when you see these things taking place, you know that the kingdom of God is near. Truly, I tell you, this generation will not pass away until all has taken place. Heaven and earth will pass away, but my words will not pass away."
  },
  "KJV": {
    "matthew": "Now learn a parable of the fig tree; When his branch is yet tender, and putteth forth leaves, ye know that summer is nigh: So likewise ye, when ye shall see all these things, know that it is near, even at the doors. Verily I say unto you, This generation shall not pass, till all these things be fulfilled. Heaven and earth shall pass away, but my words shall not pass away.",
    "mark": "Now learn a parable of the fig tree; When her branch is yet tender, and putteth forth leaves, ye know that summer is near: So ye in like manner, when ye shall see these things come to pass, know that it is nigh, even at the doors. Verily I say unto you, that this generation shall not pass, till all these things be done. Heaven and earth shall pass away: but my words shall not pass away.",
    "luke": "And he spake to them a parable; Behold the fig tree, and all the trees; When they now shoot forth, ye see and know of your own selves that summer is now nigh at hand. So likewise ye, when ye see these things come to pass, know ye that the kingdom of God is nigh at hand. Verily I say unto you, This generation shall not pass away, till all be fulfilled. Heaven and earth shall pass away: but my words shall not pass away."
  },
  "NIV": {
    "matthew": "Now learn this lesson from the fig tree: As soon as its twigs get tender and its leaves come out, you know that summer is near. Even so, when you see all these things, you know that it is near, right at the door. Truly I tell you, this generation will certainly not pass away until all these things have happened. Heaven and earth will pass away, but my words will never pass away.",
    "mark": "Now learn this lesson from the fig tree: As soon as its twigs get tender and its leaves come out, you know that summer is near. Even so, when you see these things happening, you know that the Son of Man is near, right at the door. Truly I tell you, this generation will certainly not pass away until all these things have happened. Heaven and earth will pass away, but my words will never pass away.",
    "luke": "He told them this parable: “Look at the fig tree and all the trees. When they sprout leaves, you can see for yourselves and know that summer is near. Even so, when you see these things happening, you know that the kingdom of God is near. “Truly I tell you, this generation will certainly not pass away until all these things have happened. Heaven and earth will pass away, but my words will never pass away."
  }
},
  "notes": {
  "magenta": "",
  "red": "",
  "amber": "",
  "orange": "",
  "green": "",
  "teal": "",
  "turquoise": ""
}
},
{
  "id": "8",
  "title": "The Faithful Servant",
  "slug": "the-faithful-servant",
  "imageUrl": "/assets/8_the_faithful_servant.png",
  "gospels": {
  "matthew": "24:42–51",
  "mark": "13:34–37",
  "luke": "12:35–48"
},
  "texts": {
  "ESV": {
    "matthew": "Therefore, stay awake, for you do not know on what day your Lord is coming. But know this, that if the master of the house had known in what part of the night the thief was coming, he would have stayed awake and would not have let his house be broken into. Therefore you also must be ready, for the Son of Man is coming at an hour you do not expect.\n\n“Who then is the faithful and wise servant, whom his master has set over his household, to give them their food at the proper time? Blessed is that servant whom his master will find so doing when he comes. Truly, I say to you, he will set him over all his possessions. But if that wicked servant says to himself, ‘My master is delayed,’ and begins to beat his fellow servants and eats and drinks with drunkards, the master of that servant will come on a day when he does not expect him and at an hour he does not know and will cut him in pieces and put him with the hypocrites. In that place there will be weeping and gnashing of teeth.",
    "mark": "It is like a man going on a journey, when he leaves home and puts his servants in charge, each with his work, and commands the doorkeeper to stay awake. Therefore stay awake—for you do not know when the master of the house will come, in the evening, or at midnight, or when the rooster crows, or in the morning—lest he come suddenly and find you asleep. And what I say to you I say to all: Stay awake.”",
    "luke": "“Stay dressed for action and keep your lamps burning, and be like men who are waiting for their master to come home from the wedding feast, so that when he comes and knocks, they may open to him at once. Blessed are those servants whom the master finds awake when he comes. Truly, I say to you, he will dress himself for service and have them recline at table, and he will come and serve them. If he comes in the second watch, or in the third, and finds them awake, blessed are those servants! But know this, that if the master of the house had known at what hour the thief was coming, he would not have left his house to be broken into. You also must be ready, for the Son of Man is coming at an hour you do not expect.”\n\nPeter said, “Lord, are you telling this parable for us or for all?” And the Lord said, “Who then is the faithful and wise manager, whom his master will set over his household, to give them their portion of food at the proper time? Blessed is that servant whom his master will find so doing when he comes. Truly, I say to you, he will set him over all his possessions. But if that wicked servant says to himself, ‘My master is delayed in coming,’ and begins to beat the male and female servants, and to eat and drink and get drunk, the master of that servant will come on a day when he does not expect him and at an hour he does not know, and will cut him in pieces and put him with the unfaithful. And that servant who knew his master's will but did not get ready or act according to his will will receive a severe beating. But the one who did not know, and did what deserved a beating, will receive a light beating. Everyone to whom much was given, of him much will be required, and from him to whom much was committed, much more will be demanded."
  },
  "KJV": {
    "matthew": "Watch therefore: for ye know not what hour your Lord doth come. But know this, that if the goodman of the house had known in what watch the thief would come, he would have watched, and would not have suffered his house to be broken up. Therefore be ye also ready: for in such an hour as ye think not the Son of man cometh. Who then is a faithful and wise servant, whom his lord hath made ruler over his household, to give them meat in due season? Blessed is that servant, whom his lord when he cometh shall find so doing. Verily I say unto you, That he shall make him ruler over all his goods. But and if that evil servant shall say in his heart, My lord delayeth his coming; And shall begin to smite his fellowservants, and to eat and drink with the drunken; The lord of that servant shall come in a day when he looketh not for him, and in an hour that he is not aware of, And shall cut him asunder, and appoint him his portion with the hypocrites: there shall be weeping and gnashing of teeth.",
    "mark": "For the Son of man is as a man taking a far journey, who left his house, and gave authority to his servants, and to every man his work, and commanded the porter to watch. Watch ye therefore: for ye know not when the master of the house cometh, at even, or at midnight, or at the cockcrowing, or in the morning: Lest coming suddenly he find you sleeping. And what I say unto you I say unto all, Watch.",
    "luke": "Let your loins be girded about, and your lights burning; And ye yourselves like unto men that wait for their lord, when he will return from the wedding; that when he cometh and knocketh, they may open unto him immediately. Blessed are those servants, whom the lord when he cometh shall find watching: verily I say unto you, that he shall gird himself, and make them to sit down to meat, and will come forth and serve them. And if he shall come in the second watch, or come in the third watch, and find them so, blessed are those servants. And this know, that if the goodman of the house had known what hour the thief would come, he would have watched, and not have suffered his house to be broken through. Be ye therefore ready also: for the Son of man cometh at an hour when ye think not. Then Peter said unto him, Lord, speakest thou this parable unto us, or even to all? And the Lord said, Who then is that faithful and wise steward, whom his lord shall make ruler over his household, to give them their portion of meat in due season? Blessed is that servant, whom his lord when he cometh shall find so doing. Of a truth I say unto you, that he will make him ruler over all that he hath. But and if that servant say in his heart, My lord delayeth his coming; and shall begin to beat the menservants and maidens, and to eat and drink, and to be drunken; The lord of that servant will come in a day when he looketh not for him, and at an hour when he is not aware, and will cut him in sunder, and will appoint him his portion with the unbelievers. And that servant, which knew his lord's will, and prepared not himself, neither did according to his will, shall be beaten with many stripes. But he that knew not, and did commit things worthy of stripes, shall be beaten with few stripes. For unto whomsoever much is given, of him shall be much required: and to whom men have committed much, of him they will ask the more."
  },
  "NIV": {
    "matthew": "“Therefore keep watch, because you do not know on what day your Lord will come. But understand this: If the owner of the house had known at what time of night the thief was coming, he would have kept watch and would not have let his house be broken into. So you also must be ready, because the Son of Man will come at an hour when you do not expect him.“Who then is the faithful and wise servant, whom the master has put in charge of the servants in his household to give them their food at the proper time? It will be good for that servant whose master finds him doing so when he returns. Truly I tell you, he will put him in charge of all his possessions. But suppose that servant is wicked and says to himself, ‘My master is staying away a long time,’ and he then begins to beat his fellow servants and to eat and drink with drunkards. The master of that servant will come on a day when he does not expect him and at an hour he is not aware of. He will cut him to pieces and assign him a place with the hypocrites, where there will be weeping and gnashing of teeth.",
    "mark": "It's like a man going away: He leaves his house and puts his servants in charge, each with their assigned task, and tells the one at the door to keep watch. “Therefore keep watch because you do not know when the owner of the house will come back—whether in the evening, or at midnight, or when the rooster crows, or at dawn. If he comes suddenly, do not let him find you sleeping. What I say to you, I say to everyone: ‘Watch!’”",
    "luke": "“Be dressed ready for service and keep your lamps burning, like servants waiting for their master to return from a wedding banquet, so that when he comes and knocks they can immediately open the door for him. It will be good for those servants whose master finds them watching when he comes. Truly I tell you, he will dress himself to serve, will have them recline at the table and will come and wait on them. It will be good for those servants whose master finds them ready, even if he comes in the middle of the night or toward daybreak. But understand this: If the owner of the house had known at what hour the thief was coming, he would not have let his house be broken into. You also must be ready, because the Son of Man will come at an hour when you do not expect him.” Peter asked, “Lord, are you telling this parable to us, or to everyone?” The Lord answered, “Who then is the faithful and wise manager, whom the master puts in charge of his servants to give them their food allowance at the proper time? It will be good for that servant whom the master finds doing so when he returns. Truly I tell you, he will put him in charge of all his possessions. But suppose the servant says to himself, ‘My master is taking a long time in coming,’ and he then begins to beat the other servants, both men and women, and to eat and drink and get drunk. The master of that servant will come on a day when he does not expect him and at an hour he is not aware of. He will cut him to pieces and assign him a place with the unbelievers. “The servant who knows the master’s will and does not get ready or does not do what the master wants will be beaten with many blows. But the one who does not know and does things deserving of punishment will be beaten with few blows. From everyone who has been given much, much will be demanded; and from the one who has been entrusted with much, much more will be asked."
  }
},
  "notes": {
  "magenta": "",
  "red": "",
  "amber": "",
  "orange": "",
  "green": "",
  "teal": "",
  "turquoise": ""
}
},
{
  "id": "9",
  "title": "The Growing Seed",
  "slug": "the-growing-seed",
  "imageUrl": "/assets/9_the_growing_seed.png",
  "gospels": {
  "mark": "4:26–29"
},
  "texts": {
  "ESV": {
    "mark": "And he said, “The kingdom of God is as if a man should scatter seed on the ground. He sleeps and rises night and day, and the seed sprouts and grows; he knows not how. The earth produces by itself, first the blade, then the ear, then the full grain in the ear. But when the grain is ripe, at once he puts in the sickle, because the harvest has come.”"
  },
  "KJV": {
    "mark": "And he said, So is the kingdom of God, as if a man should cast seed into the ground; And should sleep, and rise night and day, and the seed should spring and grow up, he knoweth not how. For the earth bringeth forth fruit of herself; first the blade, then the ear, after that the full corn in the ear. But when the fruit is brought forth, immediately he putteth in the sickle, because the harvest is come."
  },
  "NIV": {
    "mark": "He also said, “This is what the kingdom of God is like. A man scatters seed on the ground. Night and day, whether he sleeps or gets up, the seed sprouts and grows, though he does not know how. All by itself the soil produces grain—first the stalk, then the head, then the full kernel in the head. As soon as the grain is ripe, he puts the sickle to it, because the harvest has come.”"
  }
},
  "notes": {
  "magenta": "",
  "red": "",
  "amber": "",
  "orange": "",
  "green": "",
  "teal": "",
  "turquoise": ""
}
},
{
  "id": "10",
  "title": "The Wise & the Foolish Builders",
  "slug": "the-wise-and-the-foolish-builders",
  "imageUrl": "/assets/10_the_wise_and_the_foolish_builders.png",
  "gospels": {
  "matthew": "7:24–27",
  "luke": "6:46–49"
},
  "texts": {
  "ESV": {
    "matthew": "Everyone then who hears these words of mine and does them will be like a wise man who built his house on the rock. And the rain fell, and the floods came, and the winds blew and beat on that house, but it did not fall, because it had been founded on the rock. And everyone who hears these words of mine and does not do them will be like a foolish man who built his house on the sand. And the rain fell, and the floods came, and the winds blew and beat against that house, and it fell, and great was its fall.",
    "luke": "“Why do you call me ‘Lord, Lord,’ and not do what I tell you? Everyone who comes to me and hears my words and does them, I will show you what he is like: he is like a man building a house, who dug deep and laid the foundation on the rock. And when a flood arose, the stream broke against that house and could not shake it, because it had been well built. But the one who hears and does not do them is like a man who built a house on the ground without a foundation. When the stream broke against it, immediately it fell, and the ruin of that house was great.”"
  },
  "KJV": {
    "matthew": "Therefore whosoever heareth these sayings of mine, and doeth them, I will liken him unto a wise man, which built his house upon a rock: And the rain descended, and the floods came, and the winds blew, and beat upon that house; and it fell not: for it was founded upon a rock. And every one that heareth these sayings of mine, and doeth them not, shall be likened unto a foolish man, which built his house upon the sand: And the rain descended, and the floods came, and the winds blew, and beat upon that house; and it fell: and great was the fall of it.",
    "luke": "And why call ye me, Lord, Lord, and do not the things which I say? Whosoever cometh to me, and heareth my sayings, and doeth them, I will shew you to whom he is like: He is like a man which built an house, and digged deep, and laid the foundation on a rock: and when the flood arose, the stream beat vehemently upon that house, and could not shake it: for it was founded upon a rock. But he that heareth, and doeth not, is like a man that without a foundation built an house upon the earth; against which the stream did beat vehemently, and immediately it fell; and the ruin of that house was great."
  },
  "NIV": {
    "matthew": "Therefore everyone who hears these words of mine and puts them into practice is like the wise man who built his house on the rock. The rain came down, the streams rose, and the winds blew and beat against that house; yet it did not fall, because it had its foundation on the rock. But everyone who hears these words of mine and does not put them into practice is like the foolish man who built his house on sand. The rain came down, the streams rose, and the winds blew and beat against that house, and it fell with a great crash.",
    "luke": "“Why do you call me, ‘Lord, Lord,’ and do not do what I say? As for everyone who comes to me and hears my words and puts them into practice, I will show you what they are like. They are like a man building a house, who dug down deep and laid the foundation on rock. When a flood came, the torrent struck that house but could not shake it, because it was well built. But the one who hears my words and does not put them into practice is like a man who built a house on the ground without a foundation. The moment the torrent struck that house, it collapsed and its destruction was complete.”"
  }
},
  "notes": {
  "magenta": "",
  "red": "",
  "amber": "",
  "orange": "",
  "green": "",
  "teal": "",
  "turquoise": ""
}
},
{
  "id": "11",
  "title": "The Leaven",
  "slug": "the-leaven",
  "imageUrl": "/assets/11_the_leaven.png",
  "gospels": {
  "matthew": "13:33",
  "luke": "13:20–21"
},
  "texts": {
  "ESV": {
    "matthew": "He told them another parable. “The kingdom of heaven is like leaven that a woman took and hid in three measures of flour, till it was all leavened.”",
    "luke": "And again he said, “To what shall I compare the kingdom of God? It is like leaven that a woman took and hid in three measures of flour, until it was all leavened.”"
  },
  "KJV": {
    "matthew": "Another parable spake he unto them; The kingdom of heaven is like unto leaven, which a woman took, and hid in three measures of meal, till the whole was leavened.",
    "luke": "And again he said, Whereunto shall I liken the kingdom of God? It is like unto leaven, which a woman took and hid in three measures of meal, till the whole was leavened."
  },
  "NIV": {
    "matthew": "He told them still another parable: “The kingdom of heaven is like yeast that a woman took and mixed into about sixty pounds of flour until it worked all through the dough.”",
    "luke": "Again he asked, “What shall I compare the kingdom of God to? It is like yeast that a woman took and mixed into about sixty pounds of flour until it worked all through the dough.”"
  }
},
  "notes": {
  "magenta": "",
  "red": "",
  "amber": "",
  "orange": "",
  "green": "",
  "teal": "",
  "turquoise": ""
}
},
{
  "id": "12",
  "title": "The Lost Sheep",
  "slug": "the-lost-sheep",
  "imageUrl": "/assets/12_the_lost_sheep.png",
  "gospels": {
  "matthew": "18:10–14",
  "luke": "15:4–6"
},
  "texts": {
  "ESV": {
    "matthew": "See that you do not despise one of these little ones. For I tell you that in heaven their angels always see the face of my Father who is in heaven. What do you think? If a man has a hundred sheep and one of them has gone astray, does he not leave the ninety-nine on the mountains and go in search of the one that went astray? And if he finds it, truly, I say to you, he rejoices over it more than over the ninety-nine that never went astray. So it is not the will of my Father who is in heaven that one of these little ones should perish.",
    "luke": "What man of you, having a hundred sheep, if he has lost one of them, does not leave the ninety-nine in the open country and go after the one that is lost, until he finds it? And when he has found it, he lays it on his shoulders, rejoicing. And when he comes home, he calls together his friends and his neighbors, saying to them, ‘Rejoice with me, for I have found my sheep that was lost.’"
  },
  "KJV": {
    "matthew": "Take heed that ye despise not one of these little ones; for I say unto you, That in heaven their angels do always behold the face of my Father which is in heaven. For the Son of man is come to save that which was lost. How think ye? if a man have an hundred sheep, and one of them be gone astray, doth he not leave the ninety and nine, and goeth into the mountains, and seeketh that which is gone astray? And if so be that he find it, verily I say unto you, he rejoiceth more of that sheep, than of the ninety and nine which went not astray. Even so it is not the will of your Father which is in heaven, that one of these little ones should perish.",
    "luke": "What man of you, having an hundred sheep, if he lose one of them, doth not leave the ninety and nine in the wilderness, and go after that which is lost, until he find it? And when he hath found it, he layeth it on his shoulders, rejoicing. And when he cometh home, he calleth together his friends and neighbours, saying unto them, Rejoice with me; for I have found my sheep which was lost."
  },
  "NIV": {
    "matthew": "See that you do not despise one of these little ones. For I tell you that their angels in heaven always see the face of my Father in heaven. What do you think? If a man owns a hundred sheep, and one of them wanders away, will he not leave the ninety-nine on the hills and go to look for the one that wandered off? And if he finds it, truly I tell you, he is happier about that one sheep than about the ninety-nine that did not wander off. In the same way your Father in heaven is not willing that any of these little ones should perish.",
    "luke": "“Suppose one of you has a hundred sheep and loses one of them. Doesn’t he leave the ninety-nine in the open country and go after the lost sheep until he finds it? And when he finds it, he joyfully puts it on his shoulders and goes home. Then he calls his friends and neighbors together and says, ‘Rejoice with me; I have found my lost sheep.’\""
  }
},
  "notes": {
  "magenta": "",
  "red": "",
  "amber": "",
  "orange": "",
  "green": "",
  "teal": "",
  "turquoise": ""
}
},
{
  "id": "13",
  "title": "The Great Banquet",
  "slug": "the-great-banquet",
  "imageUrl": "/assets/13_the_great_banquet.png",
  "gospels": {
  "matthew": "22:1–14",
  "luke": "14:15–24"
},
  "texts": {
  "ESV": {
    "matthew": "And again Jesus spoke to them in parables, saying, “The kingdom of heaven may be compared to a king who gave a wedding feast for his son, and sent his servants to call those who were invited to the wedding feast, but they refused to come. Again he sent other servants, saying, ‘Tell those who are invited, “See, I have prepared my dinner, my oxen and my fattened calves have been slaughtered, and everything is ready. Come to the wedding feast.”’ But they paid no attention and went off, one to his farm, another to his business, while the rest seized his servants, treated them shamefully, and killed them. The king was enraged. He sent his troops and destroyed those murderers and burned their city. Then he said to his servants, ‘The wedding feast is ready, but those invited were not worthy. Go therefore to the main roads and invite to the wedding feast as many as you find.’ And those servants went out into the roads and gathered all whom they found, both bad and good. So the wedding hall was filled with guests.\n\n“But when the king came in to look at the guests, he saw there a man who had no wedding garment. And he said to him, ‘Friend, how did you get in here without a wedding garment?’ And he was speechless. Then the king said to the attendants, ‘Bind him hand and foot and cast him into the outer darkness. In that place there will be weeping and gnashing of teeth.’ For many are called, but few are chosen.”",
    "luke": "When one of those who reclined at table with him heard these things, he said to him, “Blessed is everyone who will eat bread in the kingdom of God!” But he said to him, “A man once gave a great banquet and invited many. And at the time for the banquet he sent his servant to say to those who had been invited, ‘Come, for everything is now ready.’ But they all alike began to make excuses. The first said to him, ‘I have bought a field, and I must go out and see it. Please have me excused.’ And another said, ‘I have bought five yoke of oxen, and I am going to examine them. Please have me excused.’ And another said, ‘I have married a wife, and therefore I cannot come.’ So the servant came and reported these things to his master. Then the master of the house became angry and said to his servant, ‘Go out quickly to the streets and lanes of the city, and bring in the poor and crippled and blind and lame.’ And the servant said, ‘Sir, what you commanded has been done, and still there is room.’ And the master said to the servant, ‘Go out to the highways and hedges and compel people to come in, that my house may be filled. For I tell you, none of those men who were invited shall taste my banquet.’”"
  },
  "KJV": {
    "matthew": "And Jesus answered and spake unto them again by parables, and said, The kingdom of heaven is like unto a certain king, which made a marriage for his son, And sent forth his servants to call them that were bidden to the wedding: and they would not come. Again, he sent forth other servants, saying, Tell them which are bidden, Behold, I have prepared my dinner: my oxen and my fatlings are killed, and all things are ready: come unto the marriage. But they made light of it, and went their ways, one to his farm, another to his merchandise: And the remnant took his servants, and entreated them spitefully, and slew them. But when the king heard thereof, he was wroth: and he sent forth his armies, and destroyed those murderers, and burned up their city. Then saith he to his servants, The wedding is ready, but they which were bidden were not worthy. Go ye therefore into the highways, and as many as ye shall find, bid to the marriage. So those servants went out into the highways, and gathered together all as many as they found, both bad and good: and the wedding was furnished with guests. And when the king came in to see the guests, he saw there a man which had not on a wedding garment: And he saith unto him, Friend, how camest thou in hither not having a wedding garment? And he was speechless. Then said the king to the servants, Bind him hand and foot, and take him away, and cast him into outer darkness; there shall be weeping and gnashing of teeth. For many are called, but few are chosen.",
    "luke": "And when one of them that sat at meat with him heard these things, he said unto him, Blessed is he that shall eat bread in the kingdom of God. Then said he unto him, A certain man made a great supper, and bade many: And sent his servant at supper time to say to them that were bidden, Come; for all things are now ready. And they all with one consent began to make excuse. The first said unto him, I have bought a piece of ground, and I must needs go and see it: I pray thee have me excused. And another said, I have bought five yoke of oxen, and I go to prove them: I pray thee have me excused. And another said, I have married a wife, and therefore I cannot come. So that servant came, and shewed his lord these things. Then the master of the house being angry said to his servant, Go out quickly into the streets and lanes of the city, and bring in hither the poor, and the maimed, and the halt, and the blind. And the servant said, Lord, it is done as thou hast commanded, and yet there is room. And the lord said unto the servant, Go out into the highways and hedges, and compel them to come in, that my house may be filled. For I say unto you, That none of those men which were bidden shall taste of my supper."
  },
  "NIV": {
    "matthew": "Jesus spoke to them again in parables, saying: “The kingdom of heaven is like a king who prepared a wedding banquet for his son. He sent his servants to those who had been invited to the banquet to tell them to come, but they refused to come. “Then he sent some more servants and said, ‘Tell those who have been invited that I have prepared my dinner: My oxen and fattened calves have been butchered, and everything is ready. Come to the wedding banquet.’ “But they paid no attention and went off—one to his farm, another to his business. The rest seized his servants, mistreated them and killed them. The king was enraged. He sent his army and destroyed those murderers and burned their city. “Then he said to his servants, ‘The wedding banquet is ready, but those I invited were not worthy. Go to the street corners and invite to the banquet anyone you find.’ So the servants went out into the streets and gathered all the people they could find, both good and bad, and the wedding hall was filled with guests. “But when the king came in to see the guests, he noticed a man there who was not wearing wedding clothes. ‘Friend,’ he asked, ‘how did you get in here without wedding clothes?’ The man was speechless. “Then the king told the attendants, ‘Tie him hand and foot, and throw him outside, into the darkness, where there will be weeping and gnashing of teeth.’ “For many are invited, but few are chosen.”",
    "luke": "When one of those at the table with him heard this, he said to Jesus, “Blessed is the one who will eat at the feast in the kingdom of God.” Jesus replied: “A certain man was preparing a great banquet and invited many guests. At the time of the banquet he sent his servant to tell those who had been invited, ‘Come, for everything is now ready.’ “But they all alike began to make excuses. The first said, ‘I have just bought a field, and I must go and see it. Please excuse me.’ “Another said, ‘I have just bought five yoke of oxen, and I’m on my way to try them out. Please excuse me.’ “Still another said, ‘I just got married, so I can’t come.’ “The servant came back and reported this to his master. Then the owner of the house became angry and ordered his servant, ‘Go out quickly into the streets and alleys of the town and bring in the poor, the crippled, the blind and the lame.’ “‘Sir,’ the servant said, ‘what you ordered has been done, but there is still room.’ “Then the master told his servant, ‘Go out to the roads and country lanes and compel them to come in, so that my house will be full. I tell you, not one of those who were invited will get a taste of my banquet.’”"
  }
},
  "notes": {
  "magenta": "",
  "red": "",
  "amber": "",
  "orange": "",
  "green": "",
  "teal": "",
  "turquoise": ""
}
},
{
  "id": "14",
  "title": "The Talents",
  "slug": "the-talents",
  "imageUrl": "/assets/14_the_talents.png",
  "gospels": {
  "matthew": "25:14–30",
  "luke": "19:12–27"
},
  "texts": {
  "ESV": {
    "matthew": "“For it will be like a man going on a journey, who called his servants and entrusted to them his property. To one he gave five talents, to another two, to another one, to each according to his ability. Then he went away. He who received the five talents went at once and traded with them, and he made five talents more. So also he who had the two talents made two talents more. But he who received the one talent went and dug in the ground and hid his master’s money. Now after a long time the master of those servants came and settled accounts with them. And he who had received the five talents came forward, bringing five talents more, saying, ‘Master, you delivered to me five talents; here I have made five talents more.’ His master said to him, ‘Well done, good and faithful servant. You have been faithful over a little; I will set you over much. Enter into the joy of your master.’ And he also who had the two talents came forward, saying, ‘Master, you delivered to me two talents; here I have made two talents more.’ His master said to him, ‘Well done, good and faithful servant. You have been faithful over a little; I will set you over much. Enter into the joy of your master.’ He also who had received the one talent came forward, saying, ‘Master, I knew you to be a hard man, reaping where you did not sow, and gathering where you scattered no seed, so I was afraid, and I went and hid your talent in the ground. Here you have what is yours.’ But his master answered him, ‘You wicked and slothful servant! You knew that I reap where I have not sown and gather where I scattered no seed? Then you ought to have invested my money with the bankers, and at my coming I should have received what was my own with interest. So take the talent from him and give it to him who has the ten talents. For to everyone who has will more be given, and he will have an abundance. But from the one who has not, even what he has will be taken away. And cast the worthless servant into the outer darkness. In that place there will be weeping and gnashing of teeth.’\"",
    "luke": "He said therefore, “A nobleman went into a far country to receive for himself a kingdom and then return. Calling ten of his servants, he gave them ten minas, and said to them, ‘Engage in business until I come.’ But his citizens hated him and sent a delegation after him, saying, ‘We do not want this man to reign over us.’ When he returned, having received the kingdom, he ordered these servants to whom he had given the money to be called to him, that he might know what they had gained by doing business. The first came before him, saying, ‘Lord, your mina has made ten minas more.’ And he said to him, ‘Well done, good servant! Because you have been faithful in a very little, you shall have authority over ten cities.’ And the second came, saying, ‘Lord, your mina has made five minas.’ And he said to him, ‘And you are to be over five cities.’ Then another came, saying, ‘Lord, here is your mina, which I kept laid away in a handkerchief; for I was afraid of you, because you are a severe man. You take what you did not deposit, and reap what you did not sow.’ He said to him, ‘I will condemn you with your own words, you wicked servant! You knew that I was a severe man, taking what I did not deposit and reaping what I did not sow? Why then did you not put my money in the bank, and at my coming I might have collected it with interest?’ And he said to those who stood by, ‘Take the mina from him, and give it to the one who has the ten minas.’ And they said to him, ‘Lord, he has ten minas!’ ‘I tell you that to everyone who has, more will be given, but from the one who has not, even what he has will be taken away. As for these enemies of mine, who did not want me to reign over them, bring them here and slaughter them before me.’”"
  },
  "KJV": {
    "matthew": "For the kingdom of heaven is as a man travelling into a far country, who called his own servants, and delivered unto them his goods. And unto one he gave five talents, to another two, and to another one; to every man according to his several ability; and straightway took his journey. Then he that had received the five talents went and traded with the same, and made them other five talents. And likewise he that had received two, he also gained other two. But he that had received one went and digged in the earth, and hid his lord's money. After a long time the lord of those servants cometh, and reckoneth with them. And so he that had received five talents came and brought other five talents, saying, Lord, thou deliveredst unto me five talents: behold, I have gained beside them five talents more. His lord said unto him, Well done, thou good and faithful servant: thou hast been faithful over a few things, I will make thee ruler over many things: enter thou into the joy of thy lord. He also that had received two talents came and said, Lord, thou deliveredst unto me two talents: behold, I have gained two other talents beside them. His lord said unto him, Well done, good and faithful servant; thou hast been faithful over a few things, I will make thee ruler over many things: enter thou into the joy of thy lord. Then he which had received the one talent came and said, Lord, I knew thee that thou art an hard man, reaping where thou hast not sown, and gathering where thou hast not strawed: And I was afraid, and went and hid thy talent in the earth: lo, there thou hast that is thine. His lord answered and said unto him, Thou wicked and slothful servant, thou knewest that I reap where I sowed not, and gather where I have not strawed: Thou oughtest therefore to have put my money to the exchangers, and then at my coming I should have received mine own with usury. Take therefore the talent from him, and give it unto him which hath ten talents. For unto every one that hath shall be given, and he shall have abundance: but from him that hath not shall be taken away even that which he hath. And cast ye the unprofitable servant into outer darkness: there shall be weeping and gnashing of teeth.",
    "luke": "A certain nobleman went into a far country to receive for himself a kingdom, and to return. And he called his ten servants, and delivered them ten pounds, and said unto them, Occupy till I come. But his citizens hated him, and sent a message after him, saying, We will not have this man to reign over us. And it came to pass, that when he was returned, having received the kingdom, then he commanded these servants to be called unto him, to whom he had given the money, that he might know how much every man had gained by trading. Then came the first, saying, Lord, thy pound hath gained ten pounds. And he said unto him, Well, thou good servant: because thou hast been faithful in a very little, have thou authority over ten cities. And the second came, saying, Lord, thy pound hath gained five pounds. And he said likewise to him, Be thou also over five cities. And another came, saying, Lord, behold, here is thy pound, which I have kept laid up in a napkin: For I feared thee, because thou art an austere man: thou takest up that thou layedst not down, and reapest that thou didst not sow. And he saith unto him, Out of thine own mouth will I judge thee, thou wicked servant. Thou knewest that I was an austere man, taking up that I laid not down, and reaping that I did not sow: Wherefore then gavest not thou my money into the bank, that at my coming I might have required mine own with usury? And he said unto them that stood by, Take from him the pound, and give it to him that hath ten pounds. (And they said unto him, Lord, he hath ten pounds.) For I say unto you, That unto every one which hath shall be given; and from him that hath not, even that he hath shall be taken away from him. But those mine enemies, which would not that I should reign over them, bring hither, and slay them before me."
  },
  "NIV": {
    "matthew": "Again, it will be like a man going on a journey, who called his servants and entrusted his wealth to them. To one he gave five bags of gold, to another two bags, and to another one bag, each according to his ability. Then he went on his journey. The man who had received five bags of gold went at once and put his money to work and gained five more. So also, the one with two bags of gold gained two more. But the man who had received one bag went off, dug a hole in the ground and hid his master’s money. After a long time the master of those servants returned and settled accounts with them. The man who had received five bags of gold brought the other five. ‘Master,’ he said, ‘you entrusted me with five bags of gold; see, I have gained five more.’ His master replied, ‘Well done, good and faithful servant! You have been faithful with a few things; I will put you in charge of many things. Come and share your master’s happiness!’ The man with two bags of gold also came. ‘Master,’ he said, ‘you entrusted me with two bags of gold; see, I have gained two more.’ His master replied, ‘Well done, good and faithful servant! You have been faithful with a few things; I will put you in charge of many things. Come and share your master’s happiness!’ Then the man who had received one bag of gold came. ‘Master,’ he said, ‘I knew that you are a hard man, harvesting where you have not sown and gathering where you have not scattered seed. So I was afraid and went out and hid your gold in the ground. See, here is what belongs to you.’ His master replied, ‘You wicked, lazy servant! So you knew that I harvest where I have not sown and gather where I have not scattered seed? Well then, you should have put my money on deposit with the bankers, so that when I returned I would have received it back with interest. So take the bag of gold from him and give it to the one who has ten bags. For whoever has will be given more, and they will have an abundance. Whoever does not have, even what they have will be taken from them. And throw that worthless servant outside, into the darkness, where there will be weeping and gnashing of teeth.’",
    "luke": "A man of noble birth went to a distant country to have himself appointed king and then to return. So he called ten of his servants and gave them ten minas. 'Put this money to work,' he said, 'until I come back.' But his subjects hated him and sent a delegation after him to say, 'We don't want this man to be our king.' He was, however, appointed king and returned home. Then he sent for the servants to whom he had given the money, in order to find out what they had gained with it. The first one came and said, 'Sir, your mina has earned ten more.' 'Well done, my good servant!' his master replied. 'Because you have been trustworthy in a very small matter, take charge of ten cities.' The second came and said, 'Sir, your mina has earned five more.' His master answered, 'You take charge of five cities.' Then another servant came and said, 'Sir, here is your mina; I have kept it laid away in a piece of cloth. I was afraid of you, because you are a hard man. You take out what you did not put in and reap what you did not sow.' His master replied, 'I will judge you by your own words, you wicked servant! You knew, did you, that I am a hard man, taking out what I did not put in and reaping what I did not sow? Why then didn't you put my money on deposit, so that when I came back, I could have collected it with interest?' Then he said to those standing by, 'Take his mina away from him and give it to the one who has ten minas.' 'Sir,' they said, 'he already has ten!' He replied, 'I tell you that to everyone who has, more will be given, but as for the one who has nothing, even what they have will be taken away. But those enemies of mine who did not want me to be king—bring them here and kill them in front of me.'\""
  }
},
  "notes": {
  "magenta": "",
  "red": "",
  "amber": "",
  "orange": "",
  "green": "",
  "teal": "",
  "turquoise": ""
}
},
{
  "id": "15",
  "title": "The Tares",
  "slug": "the-tares",
  "imageUrl": "/assets/15_the_tares.png",
  "gospels": {
  "matthew": "13:24–30"
},
  "texts": {
  "ESV": {
    "matthew": "He put another parable before them, saying, “The kingdom of heaven may be compared to a man who sowed good seed in his field, but while his men were sleeping, his enemy came and sowed weeds among the wheat and went away. So when the plants came up and bore grain, then the weeds appeared also. And the servants of the master of the house came and said to him, ‘Master, did you not sow good seed in your field? How then does it have weeds?’ He said to them, ‘An enemy has done this.’ So the servants said to him, ‘Then do you want us to go and gather them?’ But he said, ‘No, lest in gathering the weeds you root up the wheat along with them. Let both grow together until the harvest, and at harvest time I will tell the reapers, “Gather the weeds first and bind them in bundles to be burned, but gather the wheat into my barn.”’”"
  },
  "KJV": {
    "matthew": "Another parable put he forth unto them, saying, The kingdom of heaven is likened unto a man which sowed good seed in his field: But while men slept, his enemy came and sowed tares among the wheat, and went his way. But when the blade was sprung up, and brought forth fruit, then appeared the tares also. So the servants of the householder came and said unto him, Sir, didst not thou sow good seed in thy field? from whence then hath it tares? He said unto them, An enemy hath done this. The servants said unto him, Wilt thou then that we go and gather them up? But he said, Nay; lest while ye gather up the tares, ye root up also the wheat with them. Let both grow together until the harvest: and in the time of harvest I will say to the reapers, Gather ye together first the tares, and bind them in bundles to burn them: but gather the wheat into my barn."
  },
  "NIV": {
    "matthew": "Jesus told them another parable: “The kingdom of heaven is like a man who sowed good seed in his field. But while everyone was sleeping, his enemy came and sowed weeds among the wheat, and went away. When the wheat sprouted and formed heads, then the weeds also appeared. “The owner’s servants came to him and said, ‘Sir, didn’t you sow good seed in your field? Where then did the weeds come from?’ “‘An enemy did this,’ he replied. “The servants asked him, ‘Do you want us to go and pull them up?’ “‘No,’ he answered, ‘because while you are pulling the weeds, you may uproot the wheat with them. Let both grow together until the harvest. At that time I will tell the harvesters: First collect the weeds and tie them in bundles to be burned; then gather the wheat and bring it into my barn.’”"
  }
},
  "notes": {
  "magenta": "",
  "red": "",
  "amber": "",
  "orange": "",
  "green": "",
  "teal": "",
  "turquoise": ""
}
},
{
  "id": "16",
  "title": "The Hidden Treasure",
  "slug": "the-hidden-treasure",
  "imageUrl": "/assets/16_the_hidden_treasure.png",
  "gospels": {
  "matthew": "13:44"
},
  "texts": {
  "ESV": {
    "matthew": "The kingdom of heaven is like treasure hidden in a field, which a man found and covered up. Then in his joy he goes and sells all that he has and buys that field."
  },
  "KJV": {
    "matthew": "Again, the kingdom of heaven is like unto treasure hid in a field; the which when a man hath found, he hideth, and for joy thereof goeth and selleth all that he hath, and buyeth that field."
  },
  "NIV": {
    "matthew": "“The kingdom of heaven is like treasure hidden in a field. When a man found it, he hid it again, and then in his joy went and sold all he had and bought that field.”"
  }
},
  "notes": {
  "magenta": "",
  "red": "",
  "amber": "",
  "orange": "",
  "green": "",
  "teal": "",
  "turquoise": ""
}
},
{
  "id": "17",
  "title": "The Pearl",
  "slug": "the-pearl",
  "imageUrl": "/assets/17_the_pearl.png",
  "gospels": {
  "matthew": "13:45–46"
},
  "texts": {
  "ESV": {
    "matthew": "Again, the kingdom of heaven is like a merchant in search of fine pearls, who, on finding one pearl of great value, went and sold all that he had and bought it."
  },
  "KJV": {
    "matthew": "Again, the kingdom of heaven is like unto a merchant man, seeking goodly pearls: Who, when he had found one pearl of great price, went and sold all that he had, and bought it."
  },
  "NIV": {
    "matthew": "“Again, the kingdom of heaven is like a merchant looking for fine pearls. When he found one of great value, he went away and sold everything he had and bought it.\""
  }
},
  "notes": {
  "magenta": "",
  "red": "",
  "amber": "",
  "orange": "",
  "green": "",
  "teal": "",
  "turquoise": ""
}
},
{
  "id": "18",
  "title": "Drawing in the Net",
  "slug": "drawing-in-the-net",
  "imageUrl": "/assets/18_drawing_in_the_net.png",
  "gospels": {
  "matthew": "13:47–50"
},
  "texts": {
  "ESV": {
    "matthew": "“Again, the kingdom of heaven is like a net that was thrown into the sea and gathered fish of every kind. When it was full, men drew it ashore, and sat down and sorted the good into containers but threw the bad away. So it will be at the end of the age. The angels will come out and separate the evil from the righteous and throw them into the fiery furnace. In that place there will be weeping and gnashing of teeth.”"
  },
  "KJV": {
    "matthew": "Again, the kingdom of heaven is like unto a net, that was cast into the sea, and gathered of every kind: Which, when it was full, they drew to shore, and sat down, and gathered the good into vessels, but cast the bad away. So shall it be at the end of the world: the angels shall come forth, and sever the wicked from among the just, And shall cast them into the furnace of fire: there shall be wailing and gnashing of teeth."
  },
  "NIV": {
    "matthew": "“Once again, the kingdom of heaven is like a net that was let down into the lake and caught all kinds of fish. When it was full, the fishermen pulled it up on the shore. Then they sat down and sorted the good fish into baskets, but threw the bad away. This is how it will be at the end of the age. The angels will come and separate the wicked from the righteous and throw them into the blazing furnace, where there will be weeping and gnashing of teeth.”"
  }
},
  "notes": {
  "magenta": "",
  "red": "",
  "amber": "",
  "orange": "",
  "green": "",
  "teal": "",
  "turquoise": ""
}
},
{
  "id": "19",
  "title": "The Unforgiving Servant",
  "slug": "the-unforgiving-servant",
  "imageUrl": "/assets/19_the_unforgiving_servant.png",
  "gospels": {
  "matthew": "18:23–35"
},
  "texts": {
  "ESV": {
    "matthew": "“Therefore the kingdom of heaven may be compared to a king who wished to settle accounts with his servants. When he began to settle, one was brought to him who owed him ten thousand talents. And since he could not pay, his master ordered him to be sold, with his wife and children and all that he had, and payment to be made. So the servant fell on his knees, imploring him, ‘Have patience with me, and I will pay you everything.’ And out of pity for him, the master of that servant released him and forgave him the debt. But when that same servant went out, he found one of his fellow servants who owed him a hundred denarii, and seizing him, he began to choke him, saying, ‘Pay what you owe.’ So his fellow servant fell down and pleaded with him, ‘Have patience with me, and I will pay you.’ He refused and went and put him in prison until he should pay the debt. When his fellow servants saw what had taken place, they were greatly distressed, and they went and reported to their master all that had taken place. Then his master summoned him and said to him, ‘You wicked servant! I forgave you all that debt because you pleaded with me. And should not you have had mercy on your fellow servant, as I had mercy on you?’ And in anger his master delivered him to the jailers, until he should pay all his debt. So also my heavenly Father will do to every one of you, if you do not forgive your brother from your heart.”"
  },
  "KJV": {
    "matthew": "Therefore is the kingdom of heaven likened unto a certain king, which would take account of his servants. And when he had begun to reckon, one was brought unto him, which owed him ten thousand talents. But forasmuch as he had not to pay, his lord commanded him to be sold, and his wife, and children, and all that he had, and payment to be made. The servant therefore fell down, and worshipped him, saying, Lord, have patience with me, and I will pay thee all. Then the lord of that servant was moved with compassion, and loosed him, and forgave him the debt. But the same servant went out, and found one of his fellowservants, which owed him an hundred pence: and he laid hands on him, and took him by the throat, saying, Pay me that thou owest. And his fellowservant fell down at his feet, and besought him, saying, Have patience with me, and I will pay thee all. And he would not: but went and cast him into prison, till he should pay the debt. So when his fellowservants saw what was done, they were very sorry, and came and told unto their lord all that was done. Then his lord, after that he had called him, said unto him, O thou wicked servant, I forgave thee all that debt, because thou desiredst me: Shouldest not thou also have had compassion on thy fellowservant, even as I had pity on thee? And his lord was wroth, and delivered him to the tormentors, till he should pay all that was due unto him. So likewise shall my heavenly Father do also unto you, if ye from your hearts forgive not every one his brother their trespasses."
  },
  "NIV": {
    "matthew": "Therefore, the kingdom of heaven is like a king who wanted to settle accounts with his servants. As he began the settlement, a man who owed him ten thousand bags of gold was brought to him. Since he was unable to pay, the master ordered that he and his wife and his children and everything he had be sold to repay the debt. “At this the servant fell on his knees before him. ‘Be patient with me,’ he begged, ‘and I will pay back everything.’ The servant’s master took pity on him, canceled the debt and let him go. “But when that servant went out, he found one of his fellow servants who owed him a hundred silver coins. He grabbed him and began to choke him. ‘Pay back what you owe me!’ he demanded. “His fellow servant fell to his knees and begged him, ‘Be patient with me, and I will pay it back.’ “But he refused. Instead, he went off and had the man thrown into prison until he could pay the debt. When the other servants saw what had happened, they were greatly distressed and went and told their master everything that had happened. “Then the master called the servant in. ‘You wicked servant,’ he said, ‘I canceled all that debt of yours because you begged me to. Shouldn’t you have had mercy on your fellow servant just as I had on you?’ In anger his master handed him over to the jailers to be tortured, until he should pay back all he owed. “This is how my heavenly Father will treat each of you unless you forgive your brother or sister from your heart.”"
  }
},
  "notes": {
  "magenta": "",
  "red": "",
  "amber": "",
  "orange": "",
  "green": "",
  "teal": "",
  "turquoise": ""
}
},
{
  "id": "20",
  "title": "The Workers in the Vineyard",
  "slug": "the-workers-in-the-vineyard",
  "imageUrl": "/assets/20_the_workers_in_the_vineyard.png",
  "gospels": {
  "matthew": "20:1–16"
},
  "texts": {
  "ESV": {
    "matthew": "“For the kingdom of heaven is like a master of a house who went out early in the morning to hire laborers for his vineyard. After agreeing with the laborers for a denarius a day, he sent them into his vineyard. And going out about the third hour he saw others standing in the marketplace idly, and to them he said, ‘You go into the vineyard too, and whatever is right I will give you.’ So they went. Going out again about the sixth hour and the ninth hour, he did the same. And about the eleventh hour he went out and found others standing. And he said to them, ‘Why do you stand here idle all day?’ They said to him, ‘Because no one has hired us.’ He said to them, ‘You go into the vineyard too.’ And when evening came, the owner of the vineyard said to his foreman, ‘Call the laborers and pay them their wages, beginning with the last, up to the first.’ And when those hired about the eleventh hour came, each of them received a denarius. Now when those hired first came, they thought they would receive more, but each of them also received a denarius. And on receiving it they grumbled at the master of the house, saying, ‘These last worked only one hour, and you have made them equal to us who have borne the burden of the day and the scorching heat.’ But he replied to one of them, ‘Friend, I am doing you no wrong. Did you not agree with me for a denarius? Take what belongs to you and go. I choose to give to this last worker the same as to you. Am I not allowed to do what I choose with what belongs to me? Or do you begrudge my generosity?’ So the last will be first, and the first last.”"
  },
  "KJV": {
    "matthew": "For the kingdom of heaven is like unto a man that is an householder, which went out early in the morning to hire labourers into his vineyard. And when he had agreed with the labourers for a penny a day, he sent them into his vineyard. And he went out about the third hour, and saw others standing idle in the marketplace, And said unto them; Go ye also into the vineyard, and whatsoever is right I will give you. And they went their way. Again he went out about the sixth and ninth hour, and did likewise. And about the eleventh hour he went out, and found others standing idle, and saith unto them, Why stand ye here all the day idle? They say unto him, Because no man hath hired us. He saith unto them, Go ye also into the vineyard; and whatsoever is right, that shall ye receive. So when even was come, the lord of the vineyard saith unto his steward, Call the labourers, and give them their hire, beginning from the last unto the first. And when they came that were hired about the eleventh hour, they received every man a penny. But when the first came, they supposed that they should have received more; and they likewise received every man a penny. And when they had received it, they murmured against the goodman of the house, Saying, These last have wrought but one hour, and thou hast made them equal unto us, which have borne the burden and heat of the day. But he answered one of them, and said, Friend, I do thee no wrong: didst not thou agree with me for a penny? Take that thine is, and go thy way: I will give unto this last, even as unto thee. Is it not lawful for me to do what I will with mine own? Is thine eye evil, because I am good? So the last shall be first, and the first last: for many be called, but few chosen."
  },
  "NIV": {
    "matthew": "“For the kingdom of heaven is like a landowner who went out early in the morning to hire workers for his vineyard. He agreed to pay them a denarius for the day and sent them into his vineyard. “About nine in the morning he went out and saw others standing in the marketplace doing nothing. He told them, ‘You also go and work in my vineyard, and I will pay you whatever is right.’ So they went. “He went out again about noon and about three in the afternoon and did the same thing. About five in the afternoon he went out and found still others standing around. He asked them, ‘Why have you been standing here all day long doing nothing?’ “‘Because no one has hired us,’ they answered. “He said to them, ‘You also go and work in my vineyard.’ “When evening came, the owner of the vineyard said to his foreman, ‘Call the workers and pay them their wages, beginning with the last ones hired and going on to the first.’ “The workers who were hired about five in the afternoon came and each received a denarius. So when those came who were hired first, they expected to receive more. But each one of them also received a denarius. When they received it, they began to grumble against the landowner. ‘These who were hired last worked only one hour,’ they said, ‘and you have made them equal to us who have borne the burden of the work and the heat of the day.’ “But he answered one of them, ‘I am not being unfair to you, friend. Didn’t you agree to work for a denarius? Take your pay and go. I want to give the one who was hired last the same as I gave you. Don’t I have the right to do what I want with my own money? Or are you envious because I am generous?’ “So the last will be first, and the first will be last.”"
  }
},
  "notes": {
  "magenta": "",
  "red": "",
  "amber": "",
  "orange": "",
  "green": "",
  "teal": "",
  "turquoise": ""
}
},
{
  "id": "21",
  "title": "The Two Sons",
  "slug": "the-two-sons",
  "imageUrl": "/assets/21_the_two_sons.png",
  "gospels": {
  "matthew": "21:28–32"
},
  "texts": {
  "ESV": {
    "matthew": "“What do you think? A man had two sons. And he went to the first and said, ‘Son, go into the vineyard today and work.’ And he answered, ‘I will not,’ but afterward he changed his mind and went. And he went to the other son and said the same. And he answered, ‘I go, sir,’ but did not go. Which of the two did the will of his father?” They said, “The first.” Jesus said to them, “Truly, I say to you, the tax collectors and the prostitutes go into the kingdom of God before you. For John came to you in the way of righteousness, and you did not believe him, but the tax collectors and the prostitutes believed him. And even when you saw it, you did not afterward change your minds and believe him."
  },
  "KJV": {
    "matthew": "But what think ye? A certain man had two sons; and he came to the first, and said, Son, go work to day in my vineyard. He answered and said, I will not: but afterward he repented, and went. And he came to the second, and said likewise. And he answered and said, I go, sir: and went not. Whether of them twain did the will of his father? They say unto him, The first. Jesus saith unto them, Verily I say unto you, That the publicans and the harlots go into the kingdom of God before you. For John came unto you in the way of righteousness, and ye believed him not: but the publicans and the harlots believed him: and ye, when ye had seen it, repented not afterward, that ye might believe him."
  },
  "NIV": {
    "matthew": "“What do you think? There was a man who had two sons. He went to the first and said, ‘Son, go and work today in the vineyard.’ ‘I will not,’ he answered, but later he changed his mind and went. Then the father went to the other son and said the same thing. He answered, ‘I will, sir,’ but he did not go. “Which of the two did what their father wanted?” “The first,” they answered. Jesus said to them, “Truly I tell you, the tax collectors and the prostitutes are entering the kingdom of God ahead of you. For John came to you to show you the way of righteousness, and you did not believe him, but the tax collectors and the prostitutes did. And even after you saw this, you did not repent and believe him."
  }
},
  "notes": {
  "magenta": "",
  "red": "",
  "amber": "",
  "orange": "",
  "green": "",
  "teal": "",
  "turquoise": ""
}
},
{
  "id": "22",
  "title": "The Ten Virgins",
  "slug": "the-ten-virgins",
  "imageUrl": "/assets/22_the_ten_virgins.png",
  "gospels": {
  "matthew": "25:1–13"
},
  "texts": {
  "ESV": {
    "matthew": "“Then the kingdom of heaven will be like ten virgins who took their lamps and went to meet the bridegroom. Five of them were foolish, and five were wise. For when the foolish took their lamps, they took no oil with them, but the wise took flasks of oil with their lamps. As the bridegroom was delayed, they all became drowsy and slept. But at midnight there was a cry, ‘Here is the bridegroom! Come out to meet him.’ Then all those virgins rose and adjusted their lamps. And the foolish said to the wise, ‘Give us some of your oil, for our lamps are going out.’ But the wise answered, saying, ‘Since there will not be enough for us and for you, go rather to the dealers and buy for yourselves.’ And while they went to buy, the bridegroom came, and those who were ready went in with him to the marriage feast, and the door was shut. Afterward the other virgins came also, saying, ‘Lord, Lord, open to us.’ But he answered, ‘Truly, I tell you, I do not know you.’ Watch therefore, for you know neither the day nor the hour.”"
  },
  "KJV": {
    "matthew": "Then shall the kingdom of heaven be likened unto ten virgins, which took their lamps, and went forth to meet the bridegroom. And five of them were wise, and five were foolish. They that were foolish took their lamps, and took no oil with them: But the wise took oil in their vessels with their lamps. While the bridegroom tarried, they all slumbered and slept. And at midnight there was a cry made, Behold, the bridegroom cometh; go ye out to meet him. Then all those virgins arose, and trimmed their lamps. And the foolish said unto the wise, Give us of your oil; for our lamps are gone out. But the wise answered, saying, Not so; lest there be not enough for us and you: but go ye rather to them that sell, and buy for yourselves. And while they went to buy, the bridegroom came; and they that were ready went in with him to the marriage: and the door was shut. Afterward came also the other virgins, saying, Lord, Lord, open to us. But he answered and said, Verily I say unto you, I know you not. Watch therefore, for ye know neither the day nor the hour wherein the Son of man cometh."
  },
  "NIV": {
    "matthew": "“At that time the kingdom of heaven will be like ten virgins who took their lamps and went out to meet the bridegroom. Five of them were foolish and five were wise. The foolish ones took their lamps but did not take any oil with them. The wise ones, however, took oil in jars along with their lamps. The bridegroom was a long time in coming, and they all became drowsy and fell asleep. “At midnight the cry rang out: ‘Here’s the bridegroom! Come out to meet him!’ “Then all the virgins woke up and trimmed their lamps. The foolish ones said to the wise, ‘Give us some of your oil; our lamps are going out.’ “‘No,’ they replied, ‘there may not be enough for both us and you. Instead, go to those who sell oil and buy some for yourselves.’ “But while they were on their way to buy the oil, the bridegroom arrived. The virgins who were ready went in with him to the wedding banquet. And the door was shut. “Later the others also came. ‘Lord, Lord,’ they said, ‘open the door for us!’ “But he replied, ‘Truly I tell you, I don’t know you.’ “Therefore keep watch, because you do not know the day or the hour.\""
  }
},
  "notes": {
  "magenta": "",
  "red": "",
  "amber": "",
  "orange": "",
  "green": "",
  "teal": "",
  "turquoise": ""
}
},
{
  "id": "23",
  "title": "The Sheep & the Goats",
  "slug": "the-sheep-and-the-goats",
  "imageUrl": "/assets/23_the_sheep_and_the_goats.png",
  "gospels": {
  "matthew": "25:31–46"
},
  "texts": {
  "ESV": {
    "matthew": "“When the Son of Man comes in his glory, and all the angels with him, then he will sit on his glorious throne. Before him will be gathered all the nations, and he will separate them one from another, as a shepherd separates the sheep from the goats. And he will place the sheep on his right, but the goats on the left. Then the King will say to those on his right, ‘Come, you who are blessed by my Father, inherit the kingdom prepared for you from the foundation of the world. For I was hungry and you gave me food, I was thirsty and you gave me drink, I was a stranger and you welcomed me, I was naked and you clothed me, I was sick and you visited me, I was in prison and you came to me.’ Then the righteous will answer him, saying, ‘Lord, when did we see you hungry and feed you, or thirsty and give you drink? And when did we see you a stranger and welcome you, or naked and clothe you? And when did we see you sick or in prison and visit you?’ And the King will answer them, ‘Truly, I say to you, as you did it to one of the least of these my brothers, you did it to me.’\n\n“Then he will say to those on his left, ‘Depart from me, you cursed, into the eternal fire prepared for the devil and his angels. For I was hungry and you gave me no food, I was thirsty and you gave me no drink, I was a stranger and you did not welcome me, naked and you did not clothe me, sick and in prison and you did not visit me.’ Then they also will answer, saying, ‘Lord, when did we see you hungry or thirsty or a stranger or naked or sick or in prison, and did not minister to you?’ Then he will answer them, saying, ‘Truly, I say to you, as you did not do it to one of the least of these, you did not do it to me.’ And these will go away into eternal punishment, but the righteous into eternal life.”"
  },
  "KJV": {
    "matthew": "When the Son of man shall come in his glory, and all the holy angels with him, then shall he sit upon the throne of his glory: And before him shall be gathered all nations: and he shall separate them one from another, as a shepherd divideth his sheep from the goats: And he shall set the sheep on his right hand, but the goats on the left. Then shall the King say unto them on his right hand, Come, ye blessed of my Father, inherit the kingdom prepared for you from the foundation of the world: For I was an hungred, and ye gave me meat: I was thirsty, and ye gave me drink: I was a stranger, and ye took me in: Naked, and ye clothed me: I was sick, and ye visited me: I was in prison, and ye came unto me. Then shall the righteous answer him, saying, Lord, when saw we thee an hungred, and fed thee? or thirsty, and gave thee drink? When saw we thee a stranger, and took thee in? or naked, and clothed thee? Or when saw we thee sick, or in prison, and came unto thee? And the King shall answer and say unto them, Verily I say unto you, Inasmuch as ye have done it unto one of the least of these my brethren, ye have done it unto me. Then shall he say also unto them on the left hand, Depart from me, ye cursed, into everlasting fire, prepared for the devil and his angels: For I was an hungred, and ye gave me no meat: I was thirsty, and ye gave me no drink: I was a stranger, and ye took me not in: naked, and ye clothed me not: sick, and in prison, and ye visited me not. Then shall they also answer him, saying, Lord, when saw we thee an hungred, or athirst, or a stranger, or naked, or sick, or in prison, and did not minister unto thee? Then shall he answer them, saying, Verily I say unto you, Inasmuch as ye did it not to one of the least of these, ye did it not to me. And these shall go away into everlasting punishment: but the righteous into life eternal."
  },
  "NIV": {
    "matthew": "“When the Son of Man comes in his glory, and all the angels with him, he will sit on his glorious throne. All the nations will be gathered before him, and he will separate the people one from another as a shepherd separates the sheep from the goats. He will put the sheep on his right and the goats on his left. “Then the King will say to those on his right, ‘Come, you who are blessed by my Father; take your inheritance, the kingdom prepared for you since the creation of the world. For I was hungry and you gave me something to eat, I was thirsty and you gave me something to drink, I was a stranger and you invited me in, I needed clothes and you clothed me, I was sick and you looked after me, I was in prison and you came to visit me.’ “Then the righteous will answer him, ‘Lord, when did we see you hungry and feed you, or thirsty and give you something to drink? When did we see you a stranger and invite you in, or needing clothes and clothe you? When did we see you sick or in prison and go to visit you?’ “The King will reply, ‘Truly I tell you, whatever you did for one of the least of these brothers and sisters of mine, you did for me.’ “Then he will say to those on his left, ‘Depart from me, you who are cursed, into the eternal fire prepared for the devil and his angels. For I was hungry and you gave me no food, I was thirsty and you gave me no drink, I was a stranger and you did not invite me in, I needed clothes and you did not clothe me, I was sick and in prison and you did not look after me.’ “They also will answer, ‘Lord, when did we see you hungry or thirsty or a stranger or needing clothes or sick or in prison, and did not help you?’ “He will reply, ‘Truly I tell you, whatever you did not do for one of the least of these, you did not do for me.’ “Then they will go away to eternal punishment, but the righteous to eternal life.”"
  }
},
  "notes": {
  "magenta": "",
  "red": "",
  "amber": "",
  "orange": "",
  "green": "",
  "teal": "",
  "turquoise": ""
}
},
{
  "id": "24",
  "title": "The Two Debtors",
  "slug": "the-two-debtors",
  "imageUrl": "/assets/24_the_two_debtors.png",
  "gospels": {
  "luke": "7:41–43"
},
  "texts": {
  "ESV": {
    "luke": "“A certain moneylender had two debtors. One owed five hundred denarii, and the other fifty. When they could not pay, he cancelled the debt of both. Now which of them will love him more?” Simon answered, “The one, I suppose, for whom he cancelled the greater debt.” And he said to him, “You have judged rightly.”"
  },
  "KJV": {
    "luke": "There was a certain creditor which had two debtors: the one owed five hundred pence, and the other fifty. And when they had nothing to pay, he frankly forgave them both. Tell me therefore, which of them will love him most? Simon answered and said, I suppose that he, to whom he forgave most. And he said unto him, Thou hast rightly judged."
  },
  "NIV": {
    "luke": "\"Two people owed money to a certain moneylender. One owed him five hundred denarii, and the other fifty. Neither of them had the money to pay him back, so he forgave the debts of both. Now which of them will love him more?\" Simon replied, \"I suppose the one who had the bigger debt forgiven.\" \"You have judged correctly,\" Jesus said."
  }
},
  "notes": {
  "magenta": "",
  "red": "",
  "amber": "",
  "orange": "",
  "green": "",
  "teal": "",
  "turquoise": ""
}
},
{
  "id": "25",
  "title": "The Good Samaritan",
  "slug": "the-good-samaritan",
  "imageUrl": "/assets/25_the_good_samaritan.png",
  "gospels": {
  "luke": "10:25–37"
},
  "texts": {
  "ESV": {
    "luke": "And behold, a lawyer stood up to put him to the test, saying, \"Teacher, what shall I do to inherit eternal life?\" He said to him, \"What is written in the Law? How do you read it?\" And he answered, \"You shall love the Lord your God with all your heart and with all your soul and with all your strength and with all your mind, and your neighbor as yourself.\" And he said to him, \"You have answered correctly; do this, and you will live.\"\n\nBut he, desiring to justify himself, said to Jesus, \"And who is my neighbor?\" Jesus replied, \"A man was going down from Jerusalem to Jericho, and he fell among robbers, who stripped him and beat him and departed, leaving him half dead. Now by chance a priest was going down that road, and when he saw him, he passed by on the other side. So likewise a Levite, when he came to the place and saw him, passed by on the other side. But a Samaritan, as he journeyed, came to where he was, and when he saw him, he had compassion. He went to him and bound up his wounds, pouring on oil and wine. Then he set him on his own animal and brought him to an inn and took care of him. And the next day he took out two denarii and gave them to the innkeeper, saying, 'Take care of him, and whatever more you spend, I will repay you when I come back.' Which of these three, do you think, proved to be a neighbor to the man who fell among the robbers?\" He said, \"The one who showed him mercy.\" And Jesus said to him, \"You go, and do likewise.\""
  },
  "KJV": {
    "luke": "And, behold, a certain lawyer stood up, and tempted him, saying, Master, what shall I do to inherit eternal life? He said unto him, What is written in the law? how readest thou? And he answering said, Thou shalt love the Lord thy God with all thy heart, and with all thy soul, and with all thy strength, and with all thy mind; and thy neighbour as thyself. And he said unto him, Thou hast answered right: this do, and thou shalt live. But he, willing to justify himself, said unto Jesus, And who is my neighbour? And Jesus answering said, A certain man went down from Jerusalem to Jericho, and fell among thieves, which stripped him of his raiment, and wounded him, and departed, leaving him half dead. And by chance there came down a certain priest that way: and when he saw him, he passed by on the other side. And likewise a Levite, when he was at the place, came and looked on him, and passed by on the other side. But a certain Samaritan, as he journeyed, came where he was: and when he saw him, he had compassion on him, And went to him, and bound up his wounds, pouring in oil and wine, and set him on his own beast, and brought him to an inn, and took care of him. And on the morrow when he departed, he took out two pence, and gave them to the host, and said unto him, Take care of him; and whatsoever thou spendest more, when I come again, I will repay thee. Which now of these three, thinkest thou, was neighbour unto him that fell among the thieves? And he said, He that shewed mercy on him. Then said Jesus unto him, Go, and do thou likewise."
  },
  "NIV": {
    "luke": "On one occasion an expert in the law stood up to test Jesus. “Teacher,” he asked, “what must I do to inherit eternal life?” “What is written in the Law?” he replied. “How do you read it?” He answered, “‘Love the Lord your God with all your heart and with all your soul and with all your strength and with all your mind’; and, ‘Love your neighbor as yourself.’” “You have answered correctly,” Jesus replied. “Do this and you will live.” But he wanted to justify himself, so he asked Jesus, “And who is my neighbor?” In reply Jesus said: “A man was going down from Jerusalem to Jericho, when he was attacked by robbers. They stripped him of his clothes, beat him and went away, leaving him half dead. A priest happened to be going down the same road, and when he saw the man, he passed by on the other side. So too, a Levite, when he came to the place and saw him, passed by on the other side. But a Samaritan, as he traveled, came where the man was; and when he saw him, he took pity on him. He went to him and bandaged his wounds, pouring on oil and wine. Then he put the man on his own donkey, brought him to an inn and took care of him. The next day he took out two denarii and gave them to the innkeeper. ‘Look after him,’ he said, ‘and when I return, I will reimburse you for any extra expense you may have.’ “Which of these three do you think was a neighbor to the man who fell into the hands of robbers?” The expert in the law replied, “The one who had mercy on him.” Jesus told him, “Go and do likewise.”"
  }
},
  "notes": {
  "magenta": "",
  "red": "",
  "amber": "",
  "orange": "",
  "green": "",
  "teal": "",
  "turquoise": ""
}
},
{
  "id": "26",
  "title": "The Friend at Night",
  "slug": "the-friend-at-night",
  "imageUrl": "/assets/26_the_friend_at_night.png",
  "gospels": {
  "luke": "11:5–8"
},
  "texts": {
  "ESV": {
    "luke": "And he said to them, “Suppose one of you has a friend, and goes to him at midnight and says to him, ‘Friend, lend me three loaves of bread, for a friend of mine has arrived from a journey, and I have nothing to set before him’; and he will answer from within, ‘Do not bother me; the door is now shut, and my children are with me in bed. I cannot get up and give you anything.’ I tell you, though he will not get up and give him anything because he is his friend, yet because of his impudence he will rise and give him whatever he needs.\""
  },
  "KJV": {
    "luke": "And he said unto them, Which of you shall have a friend, and shall go unto him at midnight, and say unto him, Friend, lend me three loaves; For a friend of mine in his journey is come to me, and I have nothing to set before him? And he from within shall answer and say, Trouble me not: the door is now shut, and my children are with me in bed; I cannot rise and give thee. I say unto you, Though he will not rise and give him, because he is his friend, yet because of his importunity he will rise and give him as many as he needeth."
  },
  "NIV": {
    "luke": "Then Jesus said to them, “Suppose you have a friend, and you go to him at midnight and say, ‘Friend, lend me three loaves of bread; a friend of mine on a journey has come to me, and I have no food to offer him.’ And suppose the one inside answers, ‘Don’t bother me; the door is already locked, and my children and I are in bed. I can’t get up and give you anything.’ I tell you, even though he will not get up and give you the friend the bread because of friendship, yet because of the friend’s shameless persistence he will surely get up and give him as much as he needs.”"
  }
},
  "notes": {
  "magenta": "",
  "red": "",
  "amber": "",
  "orange": "",
  "green": "",
  "teal": "",
  "turquoise": ""
}
},
{
  "id": "27",
  "title": "The Rich Fool",
  "slug": "the-rich-fool",
  "imageUrl": "/assets/27_the_rich_fool.png",
  "gospels": {
  "luke": "12:16–21"
},
  "texts": {
  "ESV": {
    "luke": "He told them a parable, saying, “The land of a rich man produced plentifully, and he thought to himself, ‘What shall I do, for I have nowhere to store my crops?’ And he said, ‘I will do this: I will tear down my barns and build larger ones, and there I will store all my grain and my goods. And I will say to my soul, “Soul, you have ample goods laid up for many years; relax, eat, drink, be merry.”’ But God said to him, ‘Fool! This night your soul is required of you, and the things you have prepared, whose will they be?’ So is the one who lays up treasure for himself and is not rich toward God.”"
  },
  "KJV": {
    "luke": "And he spake a parable unto them, saying, The ground of a certain rich man yielded plentifully: And he thought within himself, saying, What shall I do, because I have no room where to bestow my fruits? And he said, This will I do: I will pull down my barns, and build greater; and there will I bestow all my fruits and my goods. And I will say to my soul, Soul, thou hast much goods laid up for many years; take thine ease, eat, drink, and be merry. But God said unto him, Thou fool, this night thy soul shall be required of thee: then whose shall those things be, which thou hast provided? So is he that layeth up treasure for himself, and is not rich toward God."
  },
  "NIV": {
    "luke": "And he told them this parable: “The ground of a certain rich man yielded an abundant harvest. He thought to himself, ‘What shall I do? I have no place to store my crops.’ “Then he said, ‘This is what I’ll do. I will tear down my barns and build bigger ones, and there I will store my surplus grain. And I’ll say to myself, “You have plenty of grain laid up for many years. Take life easy; eat, drink and be merry.”’ “But God said to him, ‘You fool! This very night your life will be demanded from you. Then who will get what you have prepared for yourself?’ “This is how it will be with whoever stores up things for themselves but is not rich toward God.”"
  }
},
  "notes": {
  "magenta": "",
  "red": "",
  "amber": "",
  "orange": "",
  "green": "",
  "teal": "",
  "turquoise": ""
}
},
{
  "id": "28",
  "title": "The Barren Fig Tree",
  "slug": "the-barren-fig-tree",
  "imageUrl": "/assets/28_the_barren_fig_tree.png",
  "gospels": {
  "luke": "13:6–9"
},
  "texts": {
  "ESV": {
    "luke": "And he told this parable: “A man had a fig tree planted in his vineyard, and he came seeking fruit on it and found none. And he said to the vinedresser, ‘Look, for three years now I have come seeking fruit on this fig tree, and I find none. Cut it down. Why should it use up the ground?’ And he answered him, ‘Sir, let it alone this year also, until I dig around it and put on manure. Then if it bears fruit next year, well and good; but if not, you can cut it down.’”"
  },
  "KJV": {
    "luke": "He spake also this parable; A certain man had a fig tree planted in his vineyard; and he came and sought fruit thereon, and found none. Then said he unto the dresser of his vineyard, Behold, these three years I come seeking fruit on this fig tree, and find none: cut it down; why cumbereth it the ground? And he answering said unto him, Lord, let it alone this year also, till I shall dig about it, and dung it: And if it bear fruit, well: and if not, then after that thou shalt cut it down."
  },
  "NIV": {
    "luke": "A man had a fig tree growing in his vineyard, and he went to look for fruit on it but did not find any. So he said to the man who took care of the vineyard, ‘For three years now I’ve been coming to look for fruit on this fig tree and haven’t found any. Cut it down! Why should it use up the soil?’ ‘Sir,’ the man replied, ‘leave it alone for one more year, and I’ll dig around it and fertilize it. If it bears fruit next year, fine! If not, then cut it down.’"
  }
},
  "notes": {
  "magenta": "",
  "red": "",
  "amber": "",
  "orange": "",
  "green": "",
  "teal": "",
  "turquoise": ""
}
},
{
  "id": "29",
  "title": "The Wedding Feast",
  "slug": "the-wedding-feast",
  "imageUrl": "/assets/29_the_wedding_feast.png",
  "gospels": {
  "luke": "14:7–14"
},
  "texts": {
  "ESV": {
    "luke": "When he noticed how the guests chose the places of honor, he told them a parable, saying to them, “When you are invited by someone to a wedding feast, do not recline in a place of honor, lest someone more distinguished than you be invited by him, and he who invited you both will come and say to you, ‘Give your place to this person,’ and then you will begin with shame to take the lowest place. But when you are invited, go and recline in the lowest place, so that when he who invited you comes he may say to you, ‘Friend, move up higher.’ Then you will be honored in the presence of all who recline with you. For everyone who exalts himself will be humbled, and he who humbles himself will be exalted.” He said also to the man who had invited him, “When you give a dinner or a banquet, do not invite your friends or your brothers or your relatives or rich neighbors, lest they also invite you in return and you be repaid. But when you give a feast, invite the poor, the crippled, the lame, the blind, and you will be blessed, because they cannot repay you. For you will be repaid at the resurrection of the just.”"
  },
  "KJV": {
    "luke": "And he put forth a parable to those which were bidden, when he marked how they chose out the chief rooms; saying unto them, When thou art bidden of any man to a wedding, sit not down in the highest room; lest a more honourable man than thou be bidden of him; And he that bade thee and him come and say to thee, Give this man place; and thou begin with shame to take the lowest room. But when thou art bidden, go and sit down in the lowest room; that when he that bade thee cometh, he may say unto thee, Friend, go up higher: then shalt thou have worship in the presence of them that sit at meat with thee. For whosoever exalteth himself shall be abased; and he that humbleth himself shall be exalted. Then said he also to him that bade him, When thou makest a dinner or a supper, call not thy friends, nor thy brethren, neither thy kinsmen, nor thy rich neighbours; lest they also bid thee again, and a recompence be made thee. But when thou makest a feast, call the poor, the maimed, the lame, the blind: And thou shalt be blessed; for they cannot recompense thee: for thou shalt be recompensed at the resurrection of the just."
  },
  "NIV": {
    "luke": "When he noticed how the guests picked the places of honor at the table, he told them this parable: “When someone invites you to a wedding feast, do not take the place of honor, for a person more distinguished than you may have been invited. If so, the host who invited both of you will come and say, ‘Give this person your seat.’ Then, humiliated, you will have to take the lowest place. But when you are invited, take the lowest place, so that when your host comes, he will say, ‘Friend, move up to a better place.’ Then you will be honored in the presence of all the other guests. For all those who exalt themselves will be humbled, and those who humble themselves will be exalted.” Then Jesus said to his host, “When you give a luncheon or dinner, do not invite your friends, your brothers or sisters, your relatives, or your rich neighbors; if you do, they may invite you back and so you will be repaid. But when you give a banquet, invite the poor, the crippled, the lame, the blind, and you will be blessed. Although they cannot repay you, you will be repaid at the resurrection of the righteous.”"
  }
},
  "notes": {
  "magenta": "",
  "red": "",
  "amber": "",
  "orange": "",
  "green": "",
  "teal": "",
  "turquoise": ""
}
},
{
  "id": "30",
  "title": "Counting the Cost",
  "slug": "counting-the-cost",
  "imageUrl": "/assets/30_counting_the_cost.png",
  "gospels": {
  "luke": "14:28–33"
},
  "texts": {
  "ESV": {
    "luke": "For which of you, desiring to build a tower, does not first sit down and calculate the cost, whether he has enough to complete it? Otherwise, when he has laid a foundation and is not able to finish, all who see it begin to mock him, saying, ‘This man began to build and was not able to finish.’ Or what king, going out to encounter another king in war, will not first sit down and deliberate whether he is able with ten thousand to meet him who comes against him with twenty thousand? And if not, while the other is yet a great way off, he sends a delegation and asks for terms of peace. So therefore, any one of you who does not renounce all that he has cannot be my disciple."
  },
  "KJV": {
    "luke": "For which of you, intending to build a tower, sitteth not down first, and counteth the cost, whether he have sufficient to finish it? Lest haply, after he hath laid the foundation, and is not able to finish it, all that behold it begin to mock him, Saying, This man began to build, and was not able to finish. Or what king, going to make war against another king, sitteth not down first, and consulteth whether he be able with ten thousand to meet him that cometh against him with twenty thousand? Or else, while the other is yet a great way off, he sendeth an ambassage, and desireth conditions of peace. So likewise, whosoever he be of you that forsaketh not all that he hath, he cannot be my disciple."
  },
  "NIV": {
    "luke": "“Suppose one of you wants to build a tower. Won’t you first sit down and estimate the cost to see if you have enough money to complete it? For if you lay the foundation and are unable to finish it, everyone who sees it will ridicule you, saying, ‘This person began to build and wasn’t able to finish.’ “Or suppose a king is about to go to war against another king. Won’t he first sit down and consider whether he is able with ten thousand men to oppose the one coming against him with twenty thousand? If he is not able, he will send a delegation while the other is still a long way off and will ask for terms of peace. In the same way, those of you who do not give up everything you have cannot be my disciples."
  }
},
  "notes": {
  "magenta": "",
  "red": "",
  "amber": "",
  "orange": "",
  "green": "",
  "teal": "",
  "turquoise": ""
}
},
{
  "id": "31",
  "title": "The Lost Coin",
  "slug": "the-lost-coin",
  "imageUrl": "/assets/31_the_lost_coin.png",
  "gospels": {
  "luke": "15:8–9"
},
  "texts": {
  "ESV": {
    "luke": "“Or what woman, having ten silver coins, if she loses one coin, does not light a lamp and sweep the house and seek diligently until she finds it? And when she has found it, she calls together her friends and neighbors, saying, ‘Rejoice with me, for I have found the coin that I had lost.’ Just so, I tell you, there is joy before the angels of God over one sinner who repents.”"
  },
  "KJV": {
    "luke": "Either what woman having ten pieces of silver, if she lose one piece, doth not light a candle, and sweep the house, and seek diligently till she find it? And when she hath found it, she calleth her friends and her neighbours together, saying, Rejoice with me; for I have found the piece which I had lost."
  },
  "NIV": {
    "luke": "“Or suppose a woman has ten silver coins and loses one. Doesn’t she light a lamp, sweep the house and search carefully until she finds it? And when she finds it, she calls her friends and neighbors together and says, ‘Rejoice with me; I have found my lost coin.’ In the same way, I tell you, there is rejoicing in the presence of the angels of God over one sinner who repents.”"
  }
},
  "notes": {
  "magenta": "",
  "red": "",
  "amber": "",
  "orange": "",
  "green": "",
  "teal": "",
  "turquoise": ""
}
},
{
  "id": "32",
  "title": "The Prodigal Son",
  "slug": "the-prodigal-son",
  "imageUrl": "/assets/32_the_prodigal_son.png",
  "gospels": {
  "luke": "15:11–32"
},
  "texts": {
  "ESV": {
    "luke": "And he said, “There was a man who had two sons. And the younger of them said to his father, ‘Father, give me the share of property that is coming to me.’ And he divided his property between them. Not many days later, the younger son gathered all he had and took a journey into a far country, and there he squandered his property in reckless living. And when he had spent everything, a severe famine arose in that country, and he began to be in need. So he went and hired himself out to one of the citizens of that country, who sent him into his fields to feed pigs. And he was longing to be fed with the pods that the pigs ate, and no one gave him anything. “But when he came to himself, he said, ‘How many of my father’s hired servants have more than enough bread, but I perish here with hunger! I will arise and go to my father, and I will say to him, “Father, I have sinned against heaven and before you. I am no longer worthy to be called your son. Treat me as one of your hired servants.”’ And he arose and came to his father. But while he was still a long way off, his father saw him and felt compassion, and ran and embraced him and kissed him. And the son said to him, ‘Father, I have sinned against heaven and before you. I am no longer worthy to be called your son.’ But the father said to his servants, ‘Bring quickly the best robe, and put it on him, and put a ring on his hand, and shoes on his feet. And bring the fattened calf and kill it, and let us eat and celebrate. For this my son was dead, and is alive again; he was lost, and is found.’ And they began to celebrate. “Now his older son was in the field, and as he came and drew near to the house, he heard music and dancing. And he called one of the servants and asked what these things meant. And he said to him, ‘Your brother has come, and your father has killed the fattened calf, because he has received him back safe and sound.’ But he was angry and refused to go in. His father came out and entreated him, but he answered his father, ‘Look, these many years I have served you, and I have never disobeyed your command, yet you never gave me a young goat, that I might celebrate with my friends. But when this son of yours came, who has devoured your property with prostitutes, you killed the fattened calf for him!’ And he said to him, ‘Son, you are always with me, and all that is mine is yours. It was fitting to celebrate and be glad, for this your brother was dead, and is alive; he was lost, and is found.’”"
  },
  "KJV": {
    "luke": "And he said, A certain man had two sons: And the younger of them said to his father, Father, give me the portion of goods that falleth to me. And he divided unto them his living. And not many days after the younger son gathered all together, and took his journey into a far country, and there wasted his substance with riotous living. And when he had spent all, there arose a mighty famine in that land; and he began to be in want. And he went and joined himself to a citizen of that country; and he sent him into his fields to feed swine. And he would fain have filled his belly with the husks that the swine did eat: and no man gave unto him. And when he came to himself, he said, How many hired servants of my father's have bread enough and to spare, and I perish with hunger! I will arise and go to my father, and will say unto him, Father, I have sinned against heaven, and before thee, And am no more worthy to be called thy son: make me as one of thy hired servants. And he arose, and came to his father. But when he was yet a great way off, his father saw him, and had compassion, and ran, and fell on his neck, and kissed him. And the son said unto him, Father, I have sinned against heaven, and in thy sight, and am no more worthy to be called thy son. But the father said to his servants, Bring forth the best robe, and put it on him; and put a ring on his hand, and shoes on his feet: And bring hither the fatted calf, and kill it; and let us eat, and be merry: For this my son was dead, and is alive again; he was lost, and is found. And they began to be merry. Now his elder son was in the field: and as he came and drew nigh to the house, he heard music and dancing. And he called one of the servants, and asked what these things meant. And he said unto him, Thy brother is come; and thy father hath killed the fatted calf, because he hath received him safe and sound. And he was angry, and would not go in: therefore came his father out, and intreated him. And he answering said to his father, Lo, these many years do I serve thee, neither transgressed I at any time thy commandment: and yet thou never gavest me a kid, that I might make merry with my friends: But as soon as this thy son was come, which hath devoured thy living with harlots, thou hast killed for him the fatted calf. And he said unto him, Son, thou art ever with me, and all that I have is thine. It was meet that we should make merry, and be glad: for this thy brother was dead, and is alive again; and was lost, and is found."
  },
  "NIV": {
    "luke": "Jesus continued: “There was a man who had two sons. The younger one said to his father, ‘Father, give me my share of the estate.’ So he divided his property between them.\n\n“Not long after that, the younger son got together all he had, set off for a distant country and there squandered his wealth in wild living. After he had spent everything, there was a severe famine in that whole country, and he began to be in need. So he went and hired himself out to a citizen of that country, who sent him to his fields to feed pigs. He longed to fill his stomach with the pods that the pigs were eating, but no one gave him anything.\n\n“When he came to his senses, he said, ‘How many of my father’s hired servants have food to spare, and here I am starving to death! I will set out and go back to my father and say to him: Father, I have sinned against heaven and against you. I am no longer worthy to be called your son; make me like one of your hired servants.’ So he got up and went to his father.\n\n“But while he was still a long way off, his father saw him and was filled with compassion for him; he ran to his son, threw his arms around him and kissed him.\n\n“The son said to him, ‘Father, I have sinned against heaven and against you. I am no longer worthy to be called your son.’\n\n“But the father said to his servants, ‘Quick! Bring the best robe and put it on him. Put a ring on his finger and sandals on his feet. Bring the fattened calf and kill it. Let’s have a feast and celebrate. For this son of mine was dead and is alive again; he was lost and is found.’ So they began to celebrate.\n\n“Meanwhile, the older son was in the field. When he came near the house, he heard music and dancing. So he called one of the servants and asked him what was going on. ‘Your brother has come,’ he replied, ‘and your father has killed the fattened calf because he has him back safe and sound.’\n\n“The older brother became angry and refused to go in. So his father went out and pleaded with him. But he answered his father, ‘Look! All these years I’ve been slaving for you and never disobeyed your orders. Yet you never gave me even a young goat so I could celebrate with my friends. But when this son of yours who has squandered your property with prostitutes comes home, you kill the fattened calf for him!’\n\n“‘My son,’ the father said, ‘you are always with me, and everything I have is yours. But we had to celebrate and be glad, because this brother of yours was dead and is alive again; he was lost and is found.’”"
  }
},
  "notes": {
  "magenta": "",
  "red": "",
  "amber": "",
  "orange": "",
  "green": "",
  "teal": "",
  "turquoise": ""
}
},
{
  "id": "33",
  "title": "The Unjust Steward",
  "slug": "the-unjust-steward",
  "imageUrl": "/assets/33_the_unjust_steward.png",
  "gospels": {
  "luke": "16:1–13"
},
  "texts": {
  "ESV": {
    "luke": "He also said to the disciples, \"There was a rich man who had a manager, and charges were brought to him that this man was wasting his possessions. And he called him and said to him, 'What is this that I hear about you? Give an account of your management, for you can no longer be manager.' And the manager said to himself, 'What shall I do, since my master is taking the management away from me? I have not strength to dig, and I am ashamed to beg. I know what I will do, so that when I am removed from management, people may receive me into their houses.' So, summoning his master's debtors one by one, he said to the first, 'How much do you owe my master?' He said, 'A hundred measures of oil.' He said to him, 'Take your bill, and sit down quickly and write fifty.' Then he said to another, 'And how much do you owe?' He said, 'A hundred measures of wheat.' He said to him, 'Take your bill, and write eighty.' The master commended the dishonest manager for his shrewdness. For the sons of this world are more shrewd in dealing with their own generation than the sons of light. And I tell you, make friends for yourselves by means of unrighteous wealth, so that when it fails they may receive you into the eternal dwellings.\n\"One who is faithful in a very little is also faithful in much, and one who is dishonest in a very little is also dishonest in much. If then you have not been faithful in the unrighteous wealth, who will entrust to you the true riches? And if you have not been faithful in that which is another's, who will give you that which is your own? No servant can serve two masters, for either he will hate the one and love the other, or he will be devoted to the one and despise the other. You cannot serve God and money.\""
  },
  "KJV": {
    "luke": "And he said also unto his disciples, There was a certain rich man, which had a steward; and the same was accused unto him that he had wasted his goods. And he called him, and said unto him, How is it that I hear this of thee? give an account of thy stewardship; for thou mayest be no longer steward. Then the steward said within himself, What shall I do? for my lord taketh away from me the stewardship: I cannot dig; to beg I am ashamed. I am resolved what to do, that, when I am put out of the stewardship, they may receive me into their houses. So he called every one of his lord's debtors unto him, and said unto the first, How much owest thou unto my lord? And he said, An hundred measures of oil. And he said unto him, Take thy bill, and sit down quickly, and write fifty. Then said he to another, And how much owest thou? And he said, An hundred measures of wheat. And he said unto him, Take thy bill, and write fourscore. And the lord commended the unjust steward, because he had done wisely: for the children of this world are in their generation wiser than the children of light. And I say unto you, Make to yourselves friends of the mammon of unrighteousness; that, when ye fail, they may receive you into everlasting habitations. He that is faithful in that which is least is faithful also in much: and he that is unjust in the least is unjust also in much. If therefore ye have not been faithful in the unrighteous mammon, who will commit to your trust the true riches? And if ye have not been faithful in that which is another man's, who shall give you that which is your own? No servant can serve two masters: for either he will hate the one, and love the other; or else he will hold to the one, and despise the other. Ye cannot serve God and mammon."
  },
  "NIV": {
    "luke": "Jesus told his disciples: “There was a rich man whose manager was accused of wasting his possessions. So he called him in and asked him, ‘What is this I hear about you? Give an account of your management, because you cannot be manager any longer.’ The manager said to himself, ‘What shall I do? My master is taking away my job. I’m not strong enough to dig, and I’m ashamed to beg—I know what I’ll do so that when I lose my job here people will welcome me into their houses.’ So he called in each one of his master’s debtors. He asked the first, ‘How much do you owe my master?’ ‘Nine hundred gallons of olive oil,’ he replied. The manager told him, ‘Take your bill, sit down quickly, and make it four hundred and fifty.’ Then he asked the second, ‘And how much do you owe?’ ‘A thousand bushels of wheat,’ he replied. He told him, ‘Take your bill and make it eight hundred.’ The master commended the dishonest manager because he had acted shrewdly. For the people of this world are more shrewd in dealing with their own kind than are the people of the light. I tell you, use worldly wealth to gain friends for yourselves, so that when it is gone, you will be welcomed into eternal dwellings. “Whoever can be trusted with very little can also be trusted with much, and whoever is dishonest with very little will also be dishonest with much. So if you have not been trustworthy in handling worldly wealth, who will trust you with true riches? And if you have not been trustworthy with someone else’s property, who will give you property of your own? “No one can serve two masters. Either you will hate the one and love the other, or you will be devoted to the one and despise the other. You cannot serve both God and money.”"
  }
},
  "notes": {
  "magenta": "",
  "red": "",
  "amber": "",
  "orange": "",
  "green": "",
  "teal": "",
  "turquoise": ""
}
},
{
  "id": "34",
  "title": "The Rich Man & Lazarus",
  "slug": "the-rich-man-and-lazarus",
  "imageUrl": "/assets/34_the_rich_man_and_lazarus.png",
  "gospels": {
  "luke": "16:19–31"
},
  "texts": {
  "ESV": {
    "luke": "There was a rich man who was clothed in purple and fine linen and who feasted sumptuously every day. And at his gate was laid a poor man named Lazarus, covered with sores, who desired to be fed with what fell from the rich man's table. Moreover, even the dogs came and licked his sores. The poor man died and was carried by the angels to Abraham's side. The rich man also died and was buried, and in Hades, being in torment, he lifted up his eyes and saw Abraham far off and Lazarus at his side. And he called out, 'Father Abraham, have mercy on me, and send Lazarus to dip the tip of his finger in water and cool my tongue, for I am in anguish in this flame.' But Abraham said, 'Child, remember that in your lifetime you received your good things, and Lazarus in like manner bad things; but now he is comforted here, and you are in anguish. And besides all this, between us and you a great chasm has been fixed, in order that those who would pass from here to you may not be able, and none may cross from there to us.' And he said, 'Then I beg you, father, to send him to my father's house—for I have five brothers—so that he may warn them, lest they also come into this place of torment.' But Abraham said, 'They have Moses and the Prophets; let them hear them.' He said, 'No, father Abraham, but if someone goes to them from the dead, they will repent.' He said to him, 'If they do not hear Moses and the Prophets, neither will they be convinced if someone should rise from the dead.'"
  },
  "KJV": {
    "luke": "There was a certain rich man, which was clothed in purple and fine linen, and fared sumptuously every day: And there was a certain beggar named Lazarus, which was laid at his gate, full of sores, And desiring to be fed with the crumbs which fell from the rich man's table: moreover the dogs came and licked his sores. And it came to pass, that the beggar died, and was carried by the angels into Abraham's bosom: the rich man also died, and was buried; And in hell he lift up his eyes, being in torments, and seeth Abraham afar off, and Lazarus in his bosom. And he cried and said, Father Abraham, have mercy on me, and send Lazarus, that he may dip the tip of his finger in water, and cool my tongue; for I am tormented in this flame. But Abraham said, Son, remember that thou in thy lifetime receivedst thy good things, and likewise Lazarus evil things: but now he is comforted, and thou art tormented. And beside all this, between us and you there is a great gulf fixed: so that they which would pass from hence to you cannot; neither can they pass to us, that would come from thence. Then he said, I pray thee therefore, father, that thou wouldest send him to my father's house: For I have five brethren; that he may testify unto them, lest they also come into this place of torment. Abraham saith unto him, They have Moses and the prophets; let them hear them. And he said, Nay, father Abraham: but if one went unto them from the dead, they will repent. And he said unto him, If they hear not Moses and the prophets, neither will they be persuaded, though one rose from the dead."
  },
  "NIV": {
    "luke": "“There was a rich man who was dressed in purple and fine linen and lived in luxury every day. At his gate was laid a beggar named Lazarus, covered with sores and longing to eat what fell from the rich man’s table. Even the dogs came and licked his sores. “The time came when the beggar died and the angels carried him to Abraham’s side. The rich man also died and was buried. In Hades, where he was in torment, he looked up and saw Abraham far away, with Lazarus by his side. So he called to him, ‘Father Abraham, have pity on me and send Lazarus to dip the tip of his finger in water and cool my tongue, because I am in agony in this fire.’ “But Abraham replied, ‘Son, remember that in your lifetime you received your good things, while Lazarus received bad things, but now he is comforted here and you are in agony. And besides all this, between us and you a great chasm has been set in place, so that those who want to go from here to you cannot, nor can anyone cross over from there to us.’ “He answered, ‘Then I beg you, father, send Lazarus to my family, for I have five brothers. Let him warn them, so that they will not also come to this place of torment.’ “Abraham replied, ‘They have Moses and the Prophets; let them listen to them.’ “‘No, father Abraham,’ he said, ‘but if someone from the dead goes to them, they will repent.’ “He said to him, ‘If they do not listen to Moses and the Prophets, they will not be convinced even if someone rises from the dead.’”"
  }
},
  "notes": {
  "magenta": "",
  "red": "",
  "amber": "",
  "orange": "",
  "green": "",
  "teal": "",
  "turquoise": ""
}
},
{
  "id": "35",
  "title": "The Master & Servant",
  "slug": "the-master-and-servant",
  "imageUrl": "/assets/35_the_master_and_servant.png",
  "gospels": {
  "luke": "17:7–10"
},
  "texts": {
  "ESV": {
    "luke": "“Will any one of you who has a servant plowing or keeping sheep say to him when he has come in from the field, ‘Come at once and recline at table’? Will he not rather say to him, ‘Prepare supper for me, and put on your apron and serve me while I eat and drink, and afterward you may eat and drink’? Does he thank the servant because he did what was commanded? So you also, when you have done all that you were commanded, say, ‘We are unworthy servants; we have only done what was our duty.’”"
  },
  "KJV": {
    "luke": "And which of you, having a servant plowing or feeding cattle, will say unto him by and by, when he is come from the field, Go and sit down to meat? And will not rather say unto him, Make ready wherewith I may sup, and gird thyself, and serve me, till I have eaten and drunken; and afterward thou shalt eat and drink? Doth he thank that servant because he did the things that were commanded him? I trow not. So likewise ye, when ye shall have done all those things which are commanded you, say, We are unprofitable servants: we have done that which was our duty to do."
  },
  "NIV": {
    "luke": "Suppose one of you has a servant plowing or looking after the sheep. Will he say to the servant when he comes in from the field, ‘Come along now and sit down to eat’? Won’t he rather tell him, ‘Prepare my supper, get yourself ready and wait on me while I eat and drink; after that you may eat and drink’? Will he thank the servant because he did what he was told to do? So you also, when you have done everything you were told to do, should say, ‘We are unworthy servants; we have only done our duty.’"
  }
},
  "notes": {
  "magenta": "",
  "red": "",
  "amber": "",
  "orange": "",
  "green": "",
  "teal": "",
  "turquoise": ""
}
},
{
  "id": "36",
  "title": "The Unjust Judge",
  "slug": "the-unjust-judge",
  "imageUrl": "/assets/36_the_unjust_judge.png",
  "gospels": {
  "luke": "18:1–8"
},
  "texts": {
  "ESV": {
    "luke": "And he told them a parable to the effect that they ought always to pray and not lose heart. He said, “In a certain city there was a judge who neither feared God nor respected man. And there was a widow in that city who kept coming to him and saying, ‘Give me justice against my adversary.’ For a while he refused, but afterward he said to himself, ‘Though I neither fear God nor respect man, yet because this widow keeps bothering me, I will give her justice, so that she will not beat me down by her continual coming.’” And the Lord said, “Hear what the unrighteous judge says. And will not God give justice to his elect, who cry to him day and night? Will he delay long over them? I tell you, he will give justice to them speedily. Nevertheless, when the Son of Man comes, will he find faith on earth?”"
  },
  "KJV": {
    "luke": "And he spake a parable unto them to this end, that men ought always to pray, and not to faint; Saying, There was in a city a judge, which feared not God, neither regarded man: And there was a widow in that city; and she came unto him, saying, Avenge me of mine adversary. And he would not for a while: but afterward he said within himself, Though I fear not God, nor regard man; Yet because this widow troubleth me, I will avenge her, lest by her continual coming she weary me. And the Lord said, Hear what the unjust judge saith. And shall not God avenge his own elect, which cry day and night unto him, though he bear long with them? I tell you that he will avenge them speedily. Nevertheless when the Son of man cometh, shall he find faith on the earth?"
  },
  "NIV": {
    "luke": "Then Jesus told his disciples a parable to show them that they should always pray and not give up. He said: “In a certain town there was a judge who neither feared God nor cared what people thought. And there was a widow in that town who kept coming to him with the plea, ‘Grant me justice against my adversary.’ “For some time he refused. But finally he said to himself, ‘Even though I don’t fear God or care what people think, yet because this widow keeps bothering me, I will see that she gets justice, so that she won’t eventually come and attack me!’” And the Lord said, “Listen to what the unjust judge says. And will not God bring about justice for his chosen ones, who cry out to him day and night? Will he keep putting them off? I tell you, he will see that they get justice quickly. However, when the Son of Man comes, will he find faith on the earth?”"
  }
},
  "notes": {
  "magenta": "",
  "red": "",
  "amber": "",
  "orange": "",
  "green": "",
  "teal": "",
  "turquoise": ""
}
},
{
  "id": "37",
  "title": "The Pharisee & the Publican",
  "slug": "the-pharisee-and-the-publican",
  "imageUrl": "/assets/37_the_pharisee_and_the_publican.png",
  "gospels": {
  "luke": "18:9–14"
},
  "texts": {
  "ESV": {
    "luke": "He also told this parable to some who trusted in themselves that they were righteous, and treated others with contempt: “Two men went up into the temple to pray, one a Pharisee and the other a tax collector. The Pharisee, standing by himself, prayed thus: ‘God, I thank you that I am not like other men, extortioners, unjust, adulterers, or even like this tax collector. I fast twice a week; I give tithes of all that I get.’ But the tax collector, standing far off, would not even lift up his eyes to heaven, but beat his breast, saying, ‘God, be merciful to me, a sinner!’ I tell you, this man went down to his house justified, rather than the other. For everyone who exalts himself will be humbled, but the one who humbles himself will be exalted.”"
  },
  "KJV": {
    "luke": "And he spake this parable unto certain which trusted in themselves that they were righteous, and despised others: Two men went up into the temple to pray; the one a Pharisee, and the other a publican. The Pharisee stood and prayed thus with himself, God, I thank thee, that I am not as other men are, extortioners, unjust, adulterers, or even as this publican. I fast twice in the week, I give tithes of all that I possess. And the publican, standing afar off, would not lift up so much as his eyes unto heaven, but smote upon his breast, saying, God be merciful to me a sinner. I tell you, this man went down to his house justified rather than the other: for every one that exalteth himself shall be abased; and he that humbleth himself shall be exalted."
  },
  "NIV": {
    "luke": "To some who were confident of their own righteousness and looked down on everybody else, Jesus told this parable: “Two men went up to the temple to pray, one a Pharisee and the other a tax collector. The Pharisee stood up and prayed about himself: ‘God, I thank you that I am not like other men—robbers, evildoers, adulterers—or even like this tax collector. I fast twice a week and give a tenth of all I get.’ “But the tax collector stood at a distance. He would not even look up to heaven, but beat his breast and said, ‘God, have mercy on me, a sinner.’ “I tell you that this man, rather than the other, went home justified before God. For everyone who exalts himself will be humbled, and he who humbles himself will be exalted.”"
  }
},
  "notes": {
  "magenta": "",
  "red": "",
  "amber": "",
  "orange": "",
  "green": "",
  "teal": "",
  "turquoise": ""
}
}
];
