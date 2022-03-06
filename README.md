# StreamElements Store Manager

##### *Project was started on 11-11-2021*

Project which is built on the [StreamElements API](https://dev.streamelements.com/docs/kappa), with as sole purpose to Create, Read, Update and Delete sound effects uploaded to the StreamElements backend.

This was born out of slight annoyance with the StreamElements' website becoming very slow when managing more than 250 items uploaded to their store. 
While managing the sounds of Twitch streamer [ONSCREEN](https://twitch.tv/ONSCREEN), it quickly became almost impossible to add new sounds - when the library already consisted of over 500 sounds. Hence I started this hobby project to manage the sounds.

It has full responsive mobile support, with the exception of playing `.ogg` sounds on Safari.

## How to use

There are essentially 2 authentication levels in this project, consisting of a Guest mode and an Editor mode. The Guest mode is accessible by anyone [(go try it out!)](https://damon02.github.io/streamelements-store-manager/#/) and is able to view and listen to sound items linked to that user. The Editor mode is able to not just view, but also create, read, update and delete sound effects!

![Modes](https://user-images.githubusercontent.com/14293142/156943463-8b185df0-fe09-4a08-b072-5554ab6e86a2.PNG)

The editor suite contains all the fields that are visible inside the regular StreamElements website.

![image](https://user-images.githubusercontent.com/14293142/156943651-176dbf8b-3e99-4b19-8af8-035f5fd0ae65.png)

## Hotlink to your own stream directory
If you by any chance also manage a lot of sound effects via StreamElements and want to give your viewers a way to easily view these, you can hotlink your channel by linking it as such:

```
https://damon02.github.io/streamelements-store-manager/#/login?channel=<USERNAME>
```
Replace `<USERNAME>` with your own.

If you have already logged in with a JWT (token), you will not be redirected to prevent logging out.
