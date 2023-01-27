package main

import (
	"context"
	"fmt"
	"notification-test/notification"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

func main() {
	// Connect to the server
	conn, err := grpc.Dial("0.0.0.0:50080", grpc.WithTransportCredentials(insecure.NewCredentials()), grpc.WithBlock())
	if err != nil {
		fmt.Println("Failed to connect to server:", err)
		return
	}
	defer conn.Close()

	// Create a new client
	client := notification.NewNotificationServiceClient(conn)
	// Create a WatchNotification message
	wn := &notification.WatchNotification{
		Id:    "1",
		UId:   "2",
		Name:  "3",
		Title: "4",
		Type:  "5",
	}

	// Create a WatchNotificationRequest
	req := &notification.WatchNotificationRequest{Wn: wn}

	// Make the SendWatchNotification call
	resp, err := client.SendWatchNotification(context.Background(), req)
	if err != nil {
		fmt.Println("Error making SendWatchNotification call:", err)
		return
	}
	fmt.Println("SendWatchNotification call successful:", resp.Response)
}
