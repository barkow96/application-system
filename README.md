# Setup and launch manual - Windows 10

1. Install a code editor, preferably with a built-in Command Line Interface (CLI), e.g. **VS Code**
   [VS Code download](https://code.visualstudio.com/Download)
2. Install **Node.js** environment (add it to the PATH environment variable during installation)
   [Node.js download](https://nodejs.org/en/download)
3. Install **Node Package Manager (NPM)** using command prompt

```console
npm install -g npm
```

4. Clone the project repository
5. Unzip the repository, e.g. on your desktop. Navigate to the location where the project source files are located. Copy the path to this location
6. Open the project folder in the VS Code editor. To do this, select **File -> Open folder**, then select the folder under the previously copied path
7. Edit the **next.config.js** file, namely set the **dbUsername, dbPassword** and **dbName** variables to the appropriate values. Ask the repository owner for the proper credentials
8. Choose **Terminal -> New terminal** in the VS Code editor. In the command line navigate to the fodler where the project is located (use previously copied path)
9. Install all necessary dependencies using the command line. Then build the project and start the production server. These instructions can be achieved by using the following commands

```console
npm install
npm run build
npm start
```

**Note:** if for some reason the production server does not work properly, you can try run the development server: npm run dev

10. The application is now available for use in any browser at localhost, port 3000
    [localhost:3000](http://localhost:3000/)
