#### React Documentation

This project uses Hudsxn\IocCore, This framework was designed with React applications in mind, basically for a multi-app website with a clean backend. 

##### Creating a new Project
Run this command to create a new react project in your application:

```bash
php cli.php @build/add-react-app --dir="frontend" --name="YOUR_APP_NAME"
```

This will create an index.tsx file that sets up your application by mounting onto a selector. There is also a router file that is created so you can start defining routes.

When working with assets, always make sure the assets that are local are always in the public directory.

