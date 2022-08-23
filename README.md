# ~Captcha~ Ketchup 🍅
MVP Project - An endless captcha game... well, endless until time runs out.  
**I deployed the project on an AWS EC2 instance on 8/9/2022 but turned off the instance on 8/22/2022 to prevent costs from accruing. Players' scores from before the server shutdown are recorded at the bottom of this readme 👇**

## What is this? 🧐
This is a fun little game I coded up within 3 days. After completing the initial Google ReCaptcha check, the player must complete as many captchas as possible before time runs out. Initially the time limit is 2 minutes, but completing each captcha extends the timer by 2 seconds. Additionally each captcha awards points upon completion-- text captchas award 1 point, image captchas award 2 points, and sound captchas award 3. Text captchas are randomly selected from a selection of 1000+ pieces of text captchas. Image captchas are randomly generated from the following groups: cats, dogs, ducks, bears, waifus, and Keanu Reeves. The images of cats, dogs, ducks, bears, waifus, and Keanu Reeves are all obtained from respective APIs. Sound captchas are randomly selected from a word bank and then spoken using the browser's built-in speech synthesis function. After time runs out, the player's score and the total time survived is logged and submitted to a database once the player inputs a username. Also, there is a button on the top right of the screen to mute the audio.

#### Text Captcha
![Text Captcha](https://github.com/Panlord/Ketchup/blob/main/readmeAssets/TextCaptcha.gif)

#### Image Captchas
![Dog Image Captcha](https://github.com/Panlord/Ketchup/blob/main/readmeAssets/ImageCaptcha_Dog.gif?raw=true)
![Keanu Reeves Image Captcha](https://github.com/Panlord/Ketchup/blob/main/readmeAssets/ImageCaptcha_Keanu.gif?raw=true)

## Tech Stack 💻
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
<img src="https://user-images.githubusercontent.com/50159219/184975387-b25cab74-273b-461a-9e3d-df44799359f1.png" width=50 height=50 />

## References and Credits 📄
Background music is [Battle! Colress: Remastered ► Pokémon Black & White 2 by Zame](https://www.youtube.com/watch?v=S_IvtZjXpVM).

Image captchas obtained from [Fournierp's dataset on Kaggle](https://www.kaggle.com/datasets/fournierp/captcha-version-2-images).

APIs for image captchas from:
- [Cat as a service](https://cataas.com/#/)
- [Dog API](https://dog.ceo/dog-api/)
- [Ducks](https://random-d.uk/)
- [Placebear](https://placebear.com/)
- [Waifus](https://waifu.pics/docs)
- [Keanu Reeves](https://placekeanu.com/)

I was inspired by the following things:
- [Dunkey's Captcha video](https://www.youtube.com/watch?v=WqnXp6Saa8Y)
- [ReCaptcha: The Game](https://www.newgrounds.com/portal/view/819528)

## Scores 💯 (as of 8/22/2022)
| Name     | Score |
|----------|-------|
| alfred   | 266   |
| AlMyPal  | 143   |
| Derek    | 108   |
| Aaron    | 108   |
| bobbby   | 76    |
| noa      | 69    |
| Harrison | 67    |
| potato   | 66    |
| Amy      | 37    |
| Minggui  | 32    |
| johnny   | 32    |
| Gary     | 30    |
| Leo      | 26    |
| lo       | 16    |
| Jason    | 16    |
| Lucas    | 14    |
| King     | 10    |
| Jerome   | 8     |
| gian     | 2     |
