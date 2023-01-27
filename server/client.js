//dependencies
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

//path to our proto file
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
const NotificationService = grpc.loadPackageDefinition(pkgDefs).NotificationService;

//create the Client
const client = new NotificationService(
    "0.0.0.0:50080",
    grpc.credentials.createInsecure()
);

const watchnotification = 
//make a call to GetUser
client.SendWatchNotification({wn :{
    id : "1",
    u_id: "2",
    name: "3",
    title: "4",
    type: "5"
}}, (error, response) => {
    if (error) {
      console.log(error);
    } else {
      console.log(response);
    }
  });