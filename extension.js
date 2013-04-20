/* -*- mode: js2 - indent-tabs-mode: nil - js2-basic-offset: 4 -*- */

//based on alternative status menu extension

//const Gio = imports.gi.Gio;
const GLib = imports.gi.GLib;
const Lang = imports.lang;
const Mainloop = imports.mainloop;
//const St = imports.gi.St;

const BoxPointer = imports.ui.boxpointer;
const Main = imports.ui.main;
const PopupMenu = imports.ui.popupMenu;

const Gettext = imports.gettext.domain('gnome-shell-extensions');
const _ = Gettext.gettext;

//const ExtensionUtils = imports.misc.extensionUtils;
//const Me = ExtensionUtils.getCurrentExtension();

const Util = imports.misc.util;

//const LOCK_ENABLED_KEY = 'lock-enabled';

let extension;

// Need to reimplement here the missing bits from LoginManager







function onSuspendtobothActivate(item) {
    Main.overview.hide();

    this.menu.close(BoxPointer.PopupAnimation.NONE);
    let suspendbothtemp = Util.spawn(['systemctl', 'hybrid-sleep']);
    suspendbothtemp.activate();
}

const Extension = new Lang.Class({
    Name: 'susp-toboth.Extension',

    _init: function() {
        this.suspendtobothItem = null;

    },

    enable: function() {
        let statusMenu = Main.panel.statusArea.userMenu;

        let children = statusMenu.menu._getMenuItems();
        let index = children.length;

        /* find the old entry */
        for (let i = children.length - 1; i >= 0; i--) {
            if (children[i] == statusMenu._suspendOrPowerOffItem) {
                index = i;
                break;
            }
        }

        /* add the new entries */
        this.suspendtobothItem = new PopupMenu.PopupMenuItem(_("Suspend to both"));
        this.suspendtobothItem.connect('activate', Lang.bind(statusMenu, onSuspendtobothActivate));


        /* insert the entries at the found position */
        statusMenu.menu.addMenuItem(this.suspendtobothItem, index + 1);



    },

    disable: function() {
        let statusMenu = Main.panel.statusArea.userMenu;

        this.suspendtobothItem.destroy();


    },
});

// Put your extension initialization code here
function init(metadata) {
    return (extension = new Extension());
}

