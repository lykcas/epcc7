1. Install `node.js`. Link to [official website](https://nodejs.org/en/download/)

   PS: In the official website, please install the `LTS` edition, which is shown in the following figure:

   ![image-20200330192445828](/Users/yuke/Library/Application Support/typora-user-images/image-20200330192445828.png)

   Or you can see the [Chinese Tutorial](https://www.runoob.com/nodejs/nodejs-install-setup.html) for installation. Or search `how to install nodejs` in Google to see the English Tutorial.

2. Install `vue/cli`

   In a terminal or command prompt type:

   ```
   npm install -g @vue/cli
   ```

3. Build the backend API connection

   ```
   cd vue_api_server
   npm install
   node app.js
   ```

   Please **do not** close the terminal after it runs successcully.

4. Run our vue project

   ```
   cd vue_shop
   npm run serve
   ```

   Then you can see the Login page through `http://localhost:8080/` or you can check the url in the terminal after the `npm run serve` command success:

   ![image-20200330193901259](/Users/yuke/Library/Application Support/typora-user-images/image-20200330193901259.png)