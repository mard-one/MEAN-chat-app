import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import * as io from "socket.io-client";

import { ContactService } from "../../services/contact.service";
import { AuthService } from "../../services/auth.service";
import { ThreadService } from "../../services/thread.service";
import { MessageService } from "../../services/message.service";
import { ApiService } from "../../services/api.service";

@Component({
  selector: "app-chatroom",
  templateUrl: "./chatroom.component.html",
  styleUrls: ["./chatroom.component.css"]
})
export class ChatroomComponent implements OnInit {
  profile = { userData: { contactThread: null } };
  currentUser: object;

  formMessage: FormGroup;
  formContact: FormGroup;
  // message
  // messageClass
  // processing = false
  // usersInContactThread
  // usersInMessageThread
  // currentUser
  // tempMessage

  private socket;
  // private messagesUnread

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private contactService: ContactService,
    private authService: AuthService,
    private threadService: ThreadService,
    private messageService: MessageService,
    private router: Router
  ) {
    (() => {
      this.formMessage = this.formBuilder.group({
        message: ""
      });
      this.formContact = this.formBuilder.group({
        username: ""
      });
    })();
  }

  ngOnInit() {
    this.apiService.pageInit().subscribe(userData => {
      this.profile = userData;
      console.log(this.profile.userData);
    });
    // this.socket = io.connect("http://localhost:8080");
    // this.socket.on("exception", data => {
    //   console.log(data);
    //   // this.tempMessage = null
    // });
    // this.socket.on("success", data => {
    //   console.log(data);
    //   //   this.threadService.getAllMessageThread().subscribe((data)=>{
    //   //     // console.log("success")
    //   //     this.usersInMessageThread = data.users
    //   //     console.log("this.usersInMessageThread", this.usersInMessageThread)
    //   //   })
    //   //   if(this.currentUser){
    //   //     this.currentUser.messages = data.updatedMessageThread.messages
    //   //     console.log("this.currentUser", this.currentUser)
    //   //   }
    //   //   this.tempMessage = null
    //   //   this.countUnreadMessages(this.usersInMessageThread)
    //   // })
    //   //
    //   // this.contactService.getAllContacts().subscribe((data)=>{
    //   //   this.usersInContactThread = data.users
    //   // })
    //   // this.threadService.getAllMessageThread().subscribe((data)=>{
    //   //   this.usersInMessageThread = data.users
    //   //
    //   //   this.countUnreadMessages(this.usersInMessageThread)
    // });
  }
  
  chooseUser(user) {
    this.currentUser = user;
    console.log(this.currentUser);
  }

  // sendMessage() {
  //   this.socket.emit("sendMessage", {
  //     token: localStorage.getItem("token"),
  //     reciever: this.currentUser,
  //     message: this.formMessage.get("message").value
  //   });
  // }

  // sendMessage(){
  //   this.tempMessage = { message: this.formChat.get('message').value, sentAt: new Date()}
  //   this.socket.emit("sendMessage", {
  //     token: localStorage.getItem('token'),
  //     reciever: this.currentUser,
  //     message: this.formChat.get('message').value
  //   })
  //   this.formChat.reset()
  // }
  //
  addContact() {
    this.disableForm();
    var user = {
      username: this.formContact.get("username").value
    };
    this.contactService.addContact(user).subscribe(data => {
      if (!data.success) {
        this.enableForm();
      } else {
        setTimeout(() => {
          $("#contactModal").modal("hide");
          this.enableForm();
          this.formContact.reset();
        }, 2000);
      }
    });
  }

  disableForm() {
    // console.log("disable working")
    this.formContact.controls["username"].disable();
  }
  enableForm() {
    // console.log("enable working")
    this.formContact.controls["username"].enable();
  }
  goBack() {
    this.formContact.reset();
  }
  //
  // countUnreadMessages(usersInMessageThread){
  //   let unread = 0
  //   usersInMessageThread.messageThread.forEach((userMessage)=>{
  //     userMessage.messages.forEach((message)=>{
  //       if(!message.isRead){
  //         unread++
  //       }
  //     })
  //     this.messagesUnread = {messageThreadId: userMessage._id, unread: unread}
  //   })
  //   // console.log(this.messagesUnread)
  //   return false
  // }
  //
}
