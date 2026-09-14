SKYESTONE TV ADMIN
==================
This package contains the first interface for creating, editing and deleting TV information.

IMPORTANT: The included admin.js is DEMO MODE and stores entries only in the browser. It is intended to approve the interface before connecting shared storage.

Files:
- index.html: admin interface
- style.css: layout
- admin.js: demo create/edit/delete logic
- Code.gs: optional Google Apps Script backend for a shared Google Sheet

Next production step:
1. Create a Google Sheet named Skyestone TV Data.
2. Create a tab named TV Data with headers:
   ID, Display, Date, Start, End, Title, Details, Reserved By
3. Put the Sheet ID into Code.gs.
4. Deploy Code.gs as a Web App accessible to the authorized Skyestone users.
5. Connect admin.js and calendar.js to that endpoint.
6. Protect the admin page with Google Workspace access or another authentication layer.
