import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import * as io from "socket.io-client";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";

import * as fromStore from "../../store";
import * as fromService from "../../services";
import * as fromModel from "../../models";
import * as fromStoreSelector from "../../store/selectors";
import * as fromStoreActions from "../../store/actions";

@Component({
  selector: "app-chatroom",
  templateUrl: "./chatroom.component.html",
  styleUrls: ["./chatroom.component.css"]
})
export class ChatroomComponent implements OnInit {
  currentUser: { user: any; loaded: any; loading: any; message: any };
  chosenUser: { user: any; messageThread: { any } };
  chosenGroup: { group: any; currentUser: any };
  onlineUsers: string[];
  messages$: Observable<any>;
  messageThread$: Observable<any>;
  contactThread$: Observable<any>;
  groups$: Observable<any>;
  addContactToContactsMessage: string;
  addContactToContactsStatus: boolean;
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
  chosenProfileAvatar: {
    type: "userAvatar" | "defaultAvatar";
    url: string;
    submitted: boolean;
  };
  statusProfileAvatar: { success: boolean; message: string };
  chosenGroupAvatar: {
    type: "userAvatar" | "defaultAvatar";
    url: string;
    submitted: boolean;
  };
  chosenMembersOfGroup = new Array();
  groupMessage;
  formGroupMessage;

  formMessage: FormGroup;
  formContact: FormGroup;
  formAvatar: FormGroup;
  formCreateGroup: FormGroup;

  private socket;

  constructor(
    private formBuilder: FormBuilder,
    private userService: fromService.UserService,
    private contactService: fromService.ContactService,
    private authService: fromService.AuthService,
    private threadService: fromService.ThreadService,
    private messageService: fromService.MessageService,
    private groupService: fromService.GroupService,
    private router: Router,
    private store: Store<fromStore.ChatState>
  ) {
    (() => {
      this.formMessage = this.formBuilder.group({ message: "" });
      this.formContact = this.formBuilder.group({ username: "" });
      this.formAvatar = this.formBuilder.group({ avatar: "" });
      this.formCreateGroup = this.formBuilder.group({
        groupName: "",
        groupInfo: "",
        groupAvatar: "",
        groupMember: ""
      });
    })();
  }

  ngOnInit() {
    this.socket = io.connect(
      `http://localhost:8080?token=${localStorage.getItem("token")}`
    );
    this.store.dispatch(new fromStoreActions.LoadCurrentUser());
    this.messageThread$ = this.store.select(fromStoreSelector.getMessageThread);
    this.contactThread$ = this.store.select(fromStoreSelector.getContactThread);
    this.messages$ = this.store.select(fromStoreSelector.getMessage);
    // this.groups$ = this.store.select(fromStoreSelector.getGroup);
    this.store.select(fromStoreSelector.getUserState).subscribe(user => {
      this.currentUser = {
        user: user.data,
        loaded: user.loaded,
        loading: user.loading,
        message: user.message
      };
      console.log("user", user);
    });
    this.store
      .select(fromStoreSelector.getMessageThread)
      .subscribe(messageThread => {
        console.log("message thread", messageThread);
      });
    this.store
      .select(fromStoreSelector.getContactThread)
      .subscribe(contactThread => {
        console.log("contact thread", contactThread);
      });
    this.store.select(fromStoreSelector.getMessage).subscribe(messages => {
      console.log("messages", messages);
    });
    this.store.select(fromStoreSelector.getGroup).subscribe(groups => {
      console.log("groups", groups);
    });
    // ------------------------ Socket.io -------------------------------

    this.socket.on("connect", () => {
      this.socket.emit("room", localStorage.getItem("token"));
      this.socket.emit("give me online users");
      this.socket.on("online users", usersOnline => {
        this.onlineUsers = usersOnline;
      });
    });

    this.socket.on("successfully recieved from message thread", data => {
      console.log("socket message", data);
      this.store.dispatch(
        new fromStoreActions.AddNewMessageToMessages({
          message: data.messageSent,
          messageThread: data.messageThread
        })
      );
    });
    this.socket.on("successfully sent from message thread", data => {
      console.log("socket message", data);
      this.store.dispatch(
        new fromStoreActions.AddNewMessageToMessages({
          message: data.messageSent,
          messageThread: data.messageThread
        })
      );
      this.store.dispatch(
        new fromStoreActions.AddUnreadMessageToMessageThread({
          message: data.messageSent,
          messageThread: data.messageThread,
          currentUser: this.currentUser.user
        })
      );
    });
    this.socket.on("successfully recieved from group", data => {
      console.log("socket message", data);
      this.store.dispatch(
        new fromStoreActions.AddNewMessageToMessages({
          message: data.messageSent,
          group: data.group
        })
      );
    });
    this.socket.on("successfully sent from group", data => {
      console.log("socket message", data);
      this.store.dispatch(
        new fromStoreActions.AddNewMessageToMessages({
          message: data.messageSent,
          group: data.group
        })
      );
      this.store.dispatch(
        new fromStoreActions.AddUnreadMessageToMessageThread({
          message: data.messageSent,
          group: data.group,
          currentUser: this.currentUser.user
        })
      );
    });
    this.socket.on("new group success", data => {
      console.log("socket io recieved group", data);
      this.store.dispatch(new fromStoreActions.NewGroup(data.group));
    });
    this.socket.on("exception", data => {
      console.log(data);
    });
    // ------------------- Files ---------------------
    const handleAvatarFileSelect = evt => {
      let that = this;
      var files = evt.target.files;
      for (var i = 0, f; (f = files[i]); i++) {
        if (!f.type.match("image.*")) {
          return false;
        } else {
          var reader = new FileReader();
          reader.readAsDataURL(f);
          setTimeout(() => {
            that.chosenProfileAvatar = {
              type: "userAvatar",
              url: reader.result,
              submitted: false
            };
          }, 100);
        }
      }
    };
    const handleGroupFileSelect = evt => {
      let that = this;
      var files = evt.target.files;
      for (var i = 0, f; (f = files[i]); i++) {
        if (!f.type.match("image.*")) {
          return false;
        } else {
          var reader = new FileReader();
          reader.readAsDataURL(f);
          setTimeout(() => {
            that.chosenGroupAvatar = {
              type: "userAvatar",
              url: reader.result,
              submitted: false
            };
          }, 100);
        }
      }
    };
    document
      .getElementById("profileAvatar")
      .addEventListener("change", handleAvatarFileSelect, false);
    document
      .getElementById("groupAvatar")
      .addEventListener("change", handleGroupFileSelect, false);
  }

  chooseUserFromMessageThread(user) {
    if (user.creator && user.members) {
      this.chosenUser = null;
      console.log("group thead user", user);
      this.chosenGroup = { group: user, currentUser: this.currentUser.user };
      console.log("group thead chosen user", this.chosenUser);
      this.store.dispatch(
        new fromStoreActions.ChooseMessageFromMessageThread(
          this.chosenGroup.group
        )
      );
      this.store.dispatch(new fromStoreActions.RemoveUnreadMessageFromMessageThread(this.chosenGroup));
    } else {
      this.chosenGroup = null;
      let chosenUserFromMessageThread = user.chatBetween.filter(
        userInChatBetween => {
          return userInChatBetween._id != this.currentUser.user._id;
        }
      );
      console.log("message thead user", user);
      this.chosenUser = {
        user: chosenUserFromMessageThread[0],
        messageThread: user
      };
      console.log("message thead chosen user", this.chosenUser);
      this.store.dispatch(
        new fromStoreActions.ChooseMessageFromMessageThread(
          this.chosenUser.messageThread
        )
      );
      this.store.dispatch(
        new fromStoreActions.RemoveUnreadMessageFromMessageThread({
          messageThread: this.chosenUser.messageThread,
          currentUser: this.currentUser.user
        })
      );
    }
  }
  chooseUserFromContactThread(user) {
    if (user.messageThread.length > 0) {
      let ourMessageThread = user.messageThread.filter(thread => {
        return this.currentUser.user.messageThread
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
          new fromStoreActions.ChooseMessageFromMessageThread(
            this.chosenUser.messageThread
          )
        );
      } else {
        console.log("you do not have shared message thread with this user");
      }
    } else {
      this.chosenUser = { user: user, messageThread: undefined };
      this.store.dispatch(
        new fromStoreActions.ChooseMessageFromMessageThread(
          this.chosenUser.messageThread
        )
      );
    }
  }

  sendMessage() {
    if (this.chosenGroup && this.chosenGroup.group) {
      this.socket.emit("sendMessage", {
        token: localStorage.getItem("token"),
        reciever: this.chosenGroup.group,
        message: this.formMessage.get("message").value
      });
      this.formMessage.reset();
    } else {
      this.socket.emit("sendMessage", {
        token: localStorage.getItem("token"),
        reciever: this.chosenUser.user,
        message: this.formMessage.get("message").value
      });
      this.formMessage.reset();
    }
  }

  addContact() {
    var user = {
      username: this.formContact.get("username").value
    };
    if (user.username) {
      this.store.dispatch(new fromStoreActions.AddContactToContactThread(user));
      this.store
        .select(fromStoreSelector.getContactThreadState)
        .subscribe(state => {
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
    this.chosenProfileAvatar = { ...this.chosenProfileAvatar, submitted: true };
    if (
      this.chosenProfileAvatar &&
      this.chosenProfileAvatar.type == "userAvatar"
    ) {
      let inputEvent = event.target[0];
      this.userService.changeAvatar(inputEvent).subscribe(data => {
        this.statusProfileAvatar = data;
        if (data.success) {
          setTimeout(() => {
            this.clearAvatarPageAndBackToProfile();
          }, 1000);
        }
      });
    } else {
      if (
        this.chosenProfileAvatar &&
        this.chosenProfileAvatar.type == "defaultAvatar"
      ) {
        this.userService
          .changeAvatar(this.chosenProfileAvatar)
          .subscribe(data => {
            this.statusProfileAvatar = data;
            if (data.success) {
              setTimeout(() => {
                this.clearAvatarPageAndBackToProfile();
              }, 1000);
            }
          });
      } else {
        this.statusProfileAvatar = {
          success: false,
          message: "Please select a image"
        };
      }
    }
  }
  chosenProfileAvatarDefault(imageName) {
    this.chosenProfileAvatar = {
      type: "defaultAvatar",
      url: "./assets/images/" + imageName,
      submitted: false
    };
  }
  clearAvatarPageAndBackToProfile() {
    if (this.chosenProfileAvatar.submitted) {
      console.log("chosen avatar1", this.chosenProfileAvatar);
      this.formAvatar.reset();
      this.statusProfileAvatar = null;
      $("#avatarModal").modal("hide");
      $("#profileModal").modal("show");
    } else {
      console.log("chosen avatar2", this.chosenProfileAvatar);
      this.formAvatar.reset();
      this.chosenProfileAvatar = null;
      this.statusProfileAvatar = null;
      $("#avatarModal").modal("hide");
      $("#profileModal").modal("show");
    }
  }
  avatarModalBack() {
    this.clearAvatarPageAndBackToProfile();
  }
  avatarModalClose() {
    this.clearAvatarPageAndBackToProfile();
  }
  changeAvatarModal() {
    $("#profileModal").modal("hide");
    $("#avatarModal").modal("show");
  }
  addContactsToMembers() {
    $("#createGroupModal").modal("hide");
    $("#addMemberToModal").modal("show");
  }
  chosenContactToMembers(contact) {
    if (this.chosenMembersOfGroup && this.chosenMembersOfGroup.length) {
      const hasContact = contact => {
        return this.chosenMembersOfGroup
          .map(contactInList => {
            return contactInList._id == contact._id;
          })
          .includes(true);
      };
      if (!hasContact(contact)) {
        this.chosenMembersOfGroup.push(contact);
        console.log("new contact", this.chosenMembersOfGroup);
        return true;
      } else {
        this.chosenMembersOfGroup.splice(
          this.chosenMembersOfGroup.indexOf(contact),
          1
        );
        console.log("delete", this.chosenMembersOfGroup);
        return false;
      }
    } else {
      this.chosenMembersOfGroup.push(contact);
      console.log("first contact", this.chosenMembersOfGroup);
      return true;
    }
  }
  isChosen(contact) {
    const hasContact = contact => {
      return this.chosenMembersOfGroup
        .map(contactInList => {
          return contactInList._id == contact._id;
        })
        .includes(true);
    };
    if (hasContact(contact)) {
      return true;
    } else {
      return false;
    }
  }
  addUsernameToMembers() {
    let userToAddToGroup = this.formCreateGroup.get("groupMember").value;
    this.formCreateGroup.get("groupMember").reset();
    let hasMember = this.chosenMembersOfGroup
      .map(member => {
        return member.username == userToAddToGroup;
      })
      .includes(true);
    if (hasMember) {
      this.groupMessage = "The user has already added";
    } else {
      this.userService.userExist(userToAddToGroup).subscribe(data => {
        this.groupMessage = data.message;
        if (data.success) {
          this.chosenMembersOfGroup.push(data.user);
        }
      });
    }
  }
  addMemberToModalBack() {
    this.chosenMembersOfGroup = [];
    $("#addMemberToModal").modal("hide");
    $("#createGroupModal").modal("show");
  }
  addMemberToModalSubmit() {
    $("#addMemberToModal").modal("hide");
    $("#createGroupModal").modal("show");
  }
  deleteMember(member) {
    this.chosenMembersOfGroup.splice(
      this.chosenMembersOfGroup.indexOf(member),
      1
    );
  }
  groupFormSubmitted(event) {
    let groupInfoValue = this.formCreateGroup.get("groupInfo").value;
    let groupNameValue = this.formCreateGroup.get("groupName").value;
    let groupMember = this.chosenMembersOfGroup;
    let groupAvatar = event.target[0].files[0];
    let groupFormData = {
      name: groupNameValue,
      members: groupMember,
      avatar: groupAvatar,
      description: groupInfoValue
    };
    if (!groupNameValue) {
      this.formGroupMessage = "Name of group is required";
    } else {
      this.groupService.newGroup(groupFormData).subscribe(data => {
        this.formGroupMessage = data.message;
        if (data.success) {
          this.socket.emit("new group", { group: data.group });
          setTimeout(() => {
            $("#createGroupModal").modal("hide");
          }, 500);
        }
      });
    }
  }
}
