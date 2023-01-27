//dependencies
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const PROTO_FILE = "./notification/notification.proto";
//options needed for loading Proto file
const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  };



const pkgDefs = protoLoader.loadSync(PROTO_FILE, options);

//load Definition into gRPC
const notificationProto = grpc.loadPackageDefinition(pkgDefs);

//create gRPC server
const server = new grpc.Server();

//implement NotificationService
server.addService(notificationProto.NotificationService.service, {
    //implment GetUser
    SendWatchNotification: (input, callback) => {
      try {
        // use the input variable here
        console.log(input.request)
        console.log("This is input ^")
        callback(null, { response: "Notification sent to subscribers" });
      } catch (error) {
        callback(error, null);
      }
    },
  });

//start the Server
server.bindAsync(
    //port to serve on
    "0.0.0.0:50080",
    //authentication settings
    grpc.ServerCredentials.createInsecure(),
    //server start callback 
    (error, port) => {
      console.log(`listening on port ${port}`);
      server.start();
    }
  );