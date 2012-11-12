/**
 * The Member panel (בנימין נתניהו, גדעון סער) - displays info on a specific
 * member
 */
OKnesset.app.views.MemberView = new Ext.extend(Ext.Panel, {
    id: 'MemberView',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    // items: [{
    //     xtype : "panel"
    // }],
    currentMemeber: null,
    initComponent: function(){
        this.infoWrapper = new OKnesset.app.views.MemberView.InfoWrapper();
        //this.billList = new OKnesset.app.views.MemberView.BillList();
        this.items = [
            new Ext.Panel({
                  id: "loading",
                  cls: 'titlePanel',
                  height : "2em",
                  padding: '5',
                  html:'<div class="hebTitle">'+ OKnesset.strings.LoadingPlsWait + '</div>'
                }),        
            this.infoWrapper];
        OKnesset.app.views.MemberView.superclass.initComponent.apply(this, arguments);
    }
});

Ext.reg('MemberView', OKnesset.app.views.MemberView);

OKnesset.app.views.MemberView.memberEmailBtn = new Ext.Button({margin : '10 5 10 5'});
OKnesset.app.views.MemberView.memberCallBtn = new Ext.Button({margin : '10 5 10 5'});
OKnesset.app.views.MemberView.memberBillsBtn = new Ext.Button({margin : '10 5 10 5',text :  OKnesset.strings.bills});
OKnesset.app.views.MemberView.memberCommitteesBtn = new Ext.Button({margin : '10 5 10 5',text : OKnesset.strings.committees});
OKnesset.app.views.MemberView.memberVotesBtn = new Ext.Button({margin : '10 5 10 5',text : OKnesset.strings.votes});

OKnesset.app.views.MemberView.InfoWrapper = new Ext.extend(Ext.Panel, {
    id: 'MemberInfoWrapper',
    flex: 1,
    initComponent: function(){
        this.info = new OKnesset.app.views.MemberView.Info();
        this.image = new OKnesset.app.views.MemberView.Image();
        this.items = [this.info,
                     OKnesset.app.views.MemberView.memberEmailBtn,
                     OKnesset.app.views.MemberView.memberCallBtn,
                     OKnesset.app.views.MemberView.memberBillsBtn,
                     OKnesset.app.views.MemberView.memberCommitteesBtn,
                     OKnesset.app.views.MemberView.memberVotesBtn
                     ];
        this.dockedItems = [{
            xtype: 'panel',
            dock: 'right',
            items: [this.image]
        }];

        OKnesset.app.views.MemberView.InfoWrapper.superclass.initComponent.apply(this, arguments);
    }

});

OKnesset.app.views.MemberView.Info = new Ext.extend(Ext.Panel, {
    id: 'MemberInfo',
    tpl: memberPanelHtml,
    cls:'memberViewInfo'
});

OKnesset.app.views.MemberView.Image = new Ext.extend(Ext.Panel, {
    id: 'MemberImage',
    layout: 'fit',
    tpl: '<img src={img_url} height="100%"></img>'
});



