import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import * as io from "socket.io-client";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";

import * as fromStore from "../../store";
import {
  LoadContactThread,
  LoadMessageThread,
  getMessage,
  getMessageState,
  getMessageThread,
  getContactThread,
  getContactThreadState,
  AddNewMessageSuccess,
  AddContactToContactThread,
  ChooseMessageFromMessageThread,
  RemoveUnreadMessageFromMessageThread,
  AddUnreadMessageToMessageThread,
  LoadCurrentUser,
  getUser,
  getUserState
} from "../../store";

import { User } from "../../models/user.model";

import { ContactService } from "../../services/contact.service";
import { AuthService } from "../../services/auth.service";
import { ThreadService } from "../../services/thread.service";
import { MessageService } from "../../services/message.service";
import { UserService } from "../../services/user.service";

@Component({
  selector: "app-chatroom",
  templateUrl: "./chatroom.component.html",
  styleUrls: ["./chatroom.component.css"]
})
export class ChatroomComponent implements OnInit {
  currentUser;
  chosenUser: { user: any; messageThread: { any } };
  onlineUsers: string[];
  messages$: Observable<any>;
  messageThread$: Observable<any>;
  contactThread$: Observable<any>;
  order: string = "username";
  defaultImages = [
    "Asset1.svg",
    "Asset2.svg",
    "Asset3.svg",
    "Asset4.svg",
    "Asset5.svg",
    "Asset6.svg",
    "Asset7.svg",
    "Asset8.svg",
    "Asset9.svg",
    "Asset10.svg",
    "Asset11.svg",
    "Asset12.svg",
    "Asset13.svg",
    "Asset14.svg",
    "Asset15.svg",
    "Asset16.svg"
  ];
  chosenAvatar: { type: "userAvatar" | "defaultAvatar"; url: string };
  statusAvatar: { success: boolean; message: string };

  formMessage: FormGroup;
  formContact: FormGroup;
  formAvatar: FormGroup;

  private socket;

  addContactToContactsMessage: string;
  addContactToContactsStatus: boolean;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private contactService: ContactService,
    private authService: AuthService,
    private threadService: ThreadService,
    private messageService: MessageService,
    private router: Router,
    private store: Store<fromStore.ChatState>
  ) {
    (() => {
      this.formMessage = this.formBuilder.group({ message: "" });
      this.formContact = this.formBuilder.group({ username: "" });
      this.formAvatar = this.formBuilder.group({ avatar: "" });
    })();
  }

  ngOnInit() {
    this.socket = io.connect(
      `http://localhost:8080?token=${localStorage.getItem("token")}`
    );
    this.store.dispatch(new LoadCurrentUser());
    this.messageThread$ = this.store.select(getMessageThread);
    this.contactThread$ = this.store.select(getContactThread);
    this.messages$ = this.store.select(getMessage);
    this.store.select(getUserState).subscribe(user => {
      this.currentUser = user;
      console.log("user", user);
    });
    this.store.select(getMessageThread).subscribe(messageThread => {
      console.log("message thread", messageThread);
    });
    this.store.select(getContactThread).subscribe(contactThread => {
      console.log("contact thread", contactThread);
    });
    this.store.select(getMessage).subscribe(messages => {
      console.log("messages", messages);
    });

    this.socket.on("connect", () => {
      this.socket.emit("room", localStorage.getItem("token"));
      this.socket.emit("give me online users");
      this.socket.on("online users", usersOnline => {
        this.onlineUsers = usersOnline;
      });
    });

    this.socket.on("successfully recieved", data => {
      console.log("socket message", data);
      this.store.dispatch(
        new AddNewMessageSuccess({
          message: data.messageSent,
          messageThread: data.messageThread
        })
      );
    });
    this.socket.on("successfully sent", data => {
      console.log("socket message", data);
      this.store.dispatch(
        new AddNewMessageSuccess({
          message: data.messageSent,
          messageThread: data.messageThread
        })
      );
      this.store.dispatch(
        new AddUnreadMessageToMessageThread({
          message: data.messageSent,
          messageThread: data.messageThread,
          currentUser: this.currentUser.data
        })
      );
    });
    this.socket.on("exception", data => {
      console.log(data);
    });
    // ------------------- Files ---------------------
    const handleFileSelect = evt => {
      let that = this;
      var files = evt.target.files;
      for (var i = 0, f; (f = files[i]); i++) {
        if (!f.type.match("image.*")) {
          return false;
        } else {
          var reader = new FileReader();
          reader.onload = (function(theFile) {
            return function(e) {
              that.chosenAvatar = { type: "userAvatar", url: e.target.result };
            };
          })(f);
          reader.readAsDataURL(f);
        }
      }
    };

    document
      .getElementById("inputAvatar")
      .addEventListener("change", handleFileSelect, false);
    // ------------------- Modal ---------------------
    $("#change-avatar-modal").on("click", function() {
      $("#profileModal").modal("hide");
    });
    //trigger next modal
    $("#change-avatar-modal").on("click", function() {
      $("#avatarModal").modal("show");
    });
    $("#avatar-modal-close").on("click", function() {
      $("#avatarModal").modal("hide");
    });
    //trigger next modal
    $("#avatar-modal-close").on("click", function() {
      $("#profileModal").modal("show");
    });
    $("#avatar-modal-back").on("click", function() {
      $("#avatarModal").modal("hide");
    });
    //trigger next modal
    $("#avatar-modal-back").on("click", function() {
      $("#profileModal").modal("show");
    });
  }

  chooseUserFromMessageThread(user) {
    let chosenUserFromMessageThread = user.chatBetween.filter(
      userInChatBetween => {
        return userInChatBetween._id != this.currentUser.data._id;
      }
    );
    console.log("message thead user", user);
    this.chosenUser = {
      user: chosenUserFromMessageThread[0],
      messageThread: user
    };
    console.log("message thead chosen user", this.chosenUser);
    this.store.dispatch(
      new ChooseMessageFromMessageThread(this.chosenUser.messageThread)
    );
    this.store.dispatch(
      new RemoveUnreadMessageFromMessageThread({
        messageThread: this.chosenUser.messageThread,
        currentUser: this.currentUser.data
      })
    );
  }
  chooseUserFromContactThread(user) {
    if (user.messageThread.length > 0) {
      let ourMessageThread = user.messageThread.filter(thread => {
        return this.currentUser.data.messageThread
          .map(currentThread => {
            return currentThread._id == thread._id;
          })
          .includes(true);
      });
      if (ourMessageThread) {
        console.log("ourMessageThread", ourMessageThread);
        console.log("contact user", user);
        this.chosenUser = { user: user, messageThread: ourMessageThread[0] };
        console.log("contact chosen user", this.chosenUser);
        this.store.dispatch(
          new ChooseMessageFromMessageThread(this.chosenUser.messageThread)
        );
      } else {
        console.log("you do not have shared message thread with this user");
      }
    } else {
      this.chosenUser = { user: user, messageThread: undefined };
      this.store.dispatch(
        new ChooseMessageFromMessageThread(this.chosenUser.messageThread)
      );
    }
  }

  sendMessage() {
    this.socket.emit("sendMessage", {
      token: localStorage.getItem("token"),
      reciever: this.chosenUser.user,
      message: this.formMessage.get("message").value
    });
    this.formMessage.reset();
  }

  addContact() {
    var user = {
      username: this.formContact.get("username").value
    };
    if (user.username) {
      this.store.dispatch(new AddContactToContactThread(user));
      this.store.select(getContactThreadState).subscribe(state => {
        console.log("contact thread state", state);
        if (state.loading) {
          this.disableForm();
        } else {
          if (state.loaded) {
            this.addContactToContactsMessage = state.message;
            this.addContactToContactsStatus = state.loaded;
            setTimeout(() => {
              this.enableForm();
              this.formContact.reset();
              this.addContactToContactsMessage = "";
              $("#contactModal").modal("hide");
            }, 500);
          } else {
            this.addContactToContactsMessage = state.message;
            this.addContactToContactsStatus = state.loaded;
            this.enableForm();
          }
        }
      });
    } else {
      this.addContactToContactsMessage = "Please enter a username";
      this.addContactToContactsStatus = false;
    }
  }

  disableForm() {
    // console.log("disable working")
    this.formContact.controls["username"].disable();
  }
  enableForm() {
    // console.log("enable working")
    this.formContact.controls["username"].enable();
  }
  modalClosed() {
    this.formContact.reset();
    this.addContactToContactsMessage = "";
  }
  avatarFormSubmitted(event) {
    if(this.chosenAvatar.type == 'userAvatar'){
      let inputEvent = event.target[0];
      this.userService.changeAvatar(inputEvent).subscribe(data => {
        console.log("data form avatar", data);
      });
    } else {
      if(this.chosenAvatar.type == 'defaultAvatar'){
        this.userService.changeAvatar(this.chosenAvatar.url).subscribe(data => {
          console.log("data form avatar", data);
        });
      }
    }    
  }
  chosenAvatarDefault(imageName){
    this.chosenAvatar = { type: "defaultAvatar", url: "./assets/images/" + imageName };
  }
}
