Angular front + Spring,Mysql backend 
---
# Kanban style of managing and improving work with other people.
Here exists a board to which users can add new issues/tasks, edit them, move(take) into other sections after completing successive steps.

### Features
All the pages are protected (via AuthGuard) so you have to first login in order to access anything.
After that you can add new issues(second gif), edit their content and move to different lanes.

![login_edit_drag](https://github.com/milowedo/task-dispatching/blob/master/images/login_edit_drag.gif)

### Notifications
Application uses the longpolling technique for being up to date with the data, so that when one user adds a new issue everyone
will get to know about that.
![notifications](https://github.com/milowedo/task-dispatching/blob/master/images/notifications.gif)
