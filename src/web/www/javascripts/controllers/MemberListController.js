Ext.regController('MemberList', {

	Index: function(options) {
		if (!this.memberListView) {
			this.memberListView = this.render({
				xtype: 'MemberListView'
			});

			// never show the loading pane, because there are always members to display from slimData
			this.memberListView.showLoading(false);

			this.memberListView.memberList.addListener('itemtap',
				function(that, index, item, e) {
					var record = that.store.getAt(index);
					OKnesset.app.controllers.navigation.dispatchPanel('Member/Index/' + record.data.id, options.historyUrl);
				});
		}

		var that = this;
		
		getAPIData({
			apiKey:'members',
			success: function (data){
				OKnesset.MemberStore.loadData(data);
				that.memberListView.memberList.refresh();
			},
			failure: function (result){
				OKnesset.onError('SERVER', ["error receiving members data.", result]);
			}
		});

		// don't track if the panal was reached by pressing 'back'
		if (options.pushed){
			GATrackPage('MemberListView', '');
		}

		OKnesset.MemberStore.clearFilter(true);
		OKnesset.MemberStore.sort([OKnesset.MemberStoreSorters.alphabetical]);

		this.application.viewport.query('#toolbar')[0].setTitle(OKnesset.strings.membersTitle);
		this.application.viewport.setActiveItem(this.memberListView, options.animation);
	}
});