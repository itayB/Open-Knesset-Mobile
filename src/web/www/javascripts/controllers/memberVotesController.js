Ext.regController('memberVotes', {

    // index action
	Index: function(options)
    {
        if (!this.memberVotesView) {
            this.memberVotesView = this.render({
                xtype: 'memberVotesView',
            });

            //Get the List for reference
            this.memberVotesList = this.memberVotesView.query('#MemberVotesList')[0];

            //Defining what is happening when tapping on an item in the list
            this.memberVotesList.addListener('itemtap',
                function(that, index, item, e) {
                    var record = that.store.getAt(index);
                    OKnesset.app.controllers.navigation.dispatchPanel('VoteDetails/Index/' + record.data.id, options.historyUrl);
            });
        }

        var memberVotesController = this;

        if (this.cached != options.id) {
            this.cached = options.id;
            var hideWhileLoading = [this.memberVotesList];
            memberVotesController._init(hideWhileLoading);

            //add for votes to store
            getAPIData({
                apiKey:'memberVotesFavor',
                parameterOptions : options.id,
                success:function(data){
                    for (var i = data.length - 1; i >= 0; i--) {
                        data[i]['VoteType'] = 'favor';
                    };
                    OKnesset.MemberVotesStore.add(data);
                    memberVotesController._refresh(hideWhileLoading);
                    memberVotesController.refresh();
                },
                failure:function(result){
                    console.log("error receiving member favor votes data. ", result);
                }
            });            

            getAPIData({
                apiKey:'memberVotesAgainst',
                parameterOptions : options.id,
                success:function(data){
                    for (var i = data.length - 1; i >= 0; i--) {
                        data[i]['VoteType'] = 'against';
                    };

                    OKnesset.MemberVotesStore.add(data);
                    memberVotesController._refresh(hideWhileLoading);
                    memberVotesController.refresh();
                },
                failure:function(result){
                    console.log("error receiving member against votes data. ", result);
                }
            });            
        }

        //Change toolbar title
        this.application.viewport.query('#toolbar')[0].setTitle(OKnesset.strings.votes);



        if (options.pushed) {
            if (this.memberVotesList.scroller) {
                this.memberVotesList.scroller.scrollTo({
                    x: 0,
                    y: 0
                });
            }
        }



        this.application.viewport.setActiveItem(this.memberVotesView, options.animation);

    },
    _init: function(elementsToHIDE){

        this.memberVotesView.query('#memberVotesLoading')[0].show();

        elementsToHIDE.forEach(function(e){
            e.hide();
        });
    },
    _refresh: function(elementsToSHOW){

        this.memberVotesView.query('#memberVotesLoading')[0].hide();

        elementsToSHOW.forEach(function(e){
            e.show();
        });
    },
    refresh : function() {
        // var memberVotesList = this.memberVotesView.query('#MemberVotesList')[0];
        this.memberVotesList.refresh();
	},
});