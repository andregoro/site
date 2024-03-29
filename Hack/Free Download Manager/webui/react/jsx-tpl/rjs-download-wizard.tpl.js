
var DownloadWizard = React.createClass({

    getInitialState: function() {

        var model = app.controllers.downloadWizard.model;
        return {
            addSourcePageIsShown: model.get('addSourcePageIsShown'),
            sourceInfoPageIsShown: model.get('sourceInfoPageIsShown'),
            //showTutorial: model.get('showTutorial'),
            //showLinkCatchingMsg: model.get('showLinkCatchingMsg'),
            duplicateTrtId: model.get('duplicateTrtId'),
            trackers: model.get('trackers')
        };
    },

    componentDidMount: function(){

        //change:showTutorial change:showLinkCatchingMsg
        app.controllers.downloadWizard.model.on('change:addSourcePageIsShown change:sourceInfoPageIsShown change:duplicateTrtId change:trackers', this.onChange, this);
    },

    componentWillUnmount:function(){

        //change:showTutorial change:showLinkCatchingMsg
        app.controllers.downloadWizard.model.off('change:addSourcePageIsShown change:sourceInfoPageIsShown change:duplicateTrtId change:trackers', this.onChange, this);
    },

    onChange: function(){

        var model = app.controllers.downloadWizard.model;
        this.setState({
            addSourcePageIsShown: model.get('addSourcePageIsShown'),
            sourceInfoPageIsShown: model.get('sourceInfoPageIsShown'),
            //showTutorial: model.get('showTutorial'),
            //showLinkCatchingMsg: model.get('showLinkCatchingMsg'),
            duplicateTrtId: model.get('duplicateTrtId'),
            trackers: model.get('trackers')
        });
    },

    render: function() {


        //if ((this.state.addSourcePageIsShown
        //    || this.state.sourceInfoPageIsShown)){
        //
        //    if (this.state.showLinkCatchingMsg)
        //        return <DownloadWizardAutomaticLinkCatchingMsg />
        //
            //if (this.state.showTutorial)
            //    return <DownloadWizardTutorial />
        //
        //}

        if (this.state.addSourcePageIsShown){

            return <DownloadWizardAdd />
        }
        if (this.state.sourceInfoPageIsShown){

            if (this.state.duplicateTrtId !== false){

                return <DownloadWizardTrtExists />
            }

            return <DownloadWizardSource />
        }

        return null;
    }
});


/*
var DownloadWizardTutorial = React.createClass({

    getInitialState: function() {
        return {
            notShowTutorialAgainFlag: app.controllers.downloadWizard.model.get('notShowTutorialAgainFlag'),
            tutorialPage: app.controllers.downloadWizard.model.get('tutorialPage')
        };
    },

    componentDidMount: function(){

        app.controllers.downloadWizard.model.on('change:notShowTutorialAgainFlag change:tutorialPage', this.changeModel, this);
    },

    componentWillUnmount:function(){

        app.controllers.downloadWizard.model.off('change:notShowTutorialAgainFlag change:tutorialPage', this.changeModel, this);
    },

    changeModel: function(){

        this.setState({
            notShowTutorialAgainFlag: app.controllers.downloadWizard.model.get('notShowTutorialAgainFlag'),
            tutorialPage: app.controllers.downloadWizard.model.get('tutorialPage')
        });
    },

    close: function(){

        var save_flag = app.controllers.downloadWizard.model.get('notShowTutorialAgainFlag');
        if (save_flag)
            app.appViewManager.setDownloadsWizardState('showTutorial', false);

        app.appViewManager.setDownloadsWizardState('notShowTutorialAgainFlag', save_flag);
        app.controllers.downloadWizard.model.set({showTutorial: false});
    },

    closeTutorial: function(){

        this.close();
    },

    proceedClick: function(){

        this.close();
    },

    nextClick: function(){

        app.controllers.downloadWizard.model.set({tutorialPage: 2});
    },

    changeNotShow: function(event){

        app.controllers.downloadWizard.model.set({notShowTutorialAgainFlag: event.target.checked});
    },

    render: function() {

        return (
            <div id="download-wiz-tutorial"
                //id for moving by head (mac)
                className="temporary-style popup__overlay_adddownload"
                 onKeyDown={function(data, event) {
                //if(event.keyCode == 27) _.bind(view_model.closeByEsc, view_model);
                //if(event.keyCode == 13) _.bind(view_model.applySource, view_model);
                }}>
                <div className="mount"></div>
                <div className="popup_window popup_adddownload">

                    <div className="add_url tutorial">
                        <div className="top_add_ul">
                            <div className="modal_title">{__('Browser integration')}</div>
                            <a href="#" className="close_button" onClick={this.closeTutorial}></a>
                        </div>

                        {this.state.tutorialPage == 1 ?
                            <div>
                                <label>{__('Free Download Manager has automatically intercepted the URL that another Internet Application used to download a file. Thanks to the flexible settings FDM offers, you can easily adjust the option in the Settings window:')}</label>

                                <div className="tutorial_img tutorial_p1">
                                    {fdmApp.platform == 'mac' ?
                                        <img src="v2_images/mac_1.png" />
                                        :
                                        <img src="v2_images/windows_1.png" />
                                    }
                                </div>

                            </div>
                            : null }

                        {this.state.tutorialPage == 2 ?
                            <div>
                                <label>{__('Working with browsers, you can configure FDM so that it doesn\'t monitor left-click actions.')}</label>

                                <div className="tutorial_img tutorial_p2">
                                    {fdmApp.platform == 'mac' ?
                                        <img src="v2_images/mac_2.png" />
                                        :
                                        <img src="v2_images/windows_2.png" />
                                    }
                                </div>

                            </div>
                            : null }

                        <div className="bottom_add_ul">
                            <div className="loading">
                                <input checked={this.state.notShowTutorialAgainFlag}
                                       defaultChecked={this.state.notShowTutorialAgainFlag}
                                       onChange={this.changeNotShow}
                                       type="checkbox" id="dntsh" />
                                <label htmlFor="dntsh">{__('Don\'t show this tip again')}</label>
                            </div>
                            <div className="group_button">

                                {this.state.tutorialPage == 1 ?
                                    <button className="right_button linkblock" title=""
                                            onClick={this.nextClick}>{__('Next')}</button>
                                    :
                                    <button className="right_button linkblock tutorial_p2" title=""
                                            onClick={this.proceedClick}>{__('Proceed to download')}</button>
                                }


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
*/


var DownloadWizardTrtExists = React.createClass({

    mixins: [ButtonMixin, ToolbarDragMixin],

    toolbarDragId: 'download-wiz-add-source',

    getInitialState: function() {

        return {
            duplicateTrtId: app.controllers.downloadWizard.model.get('duplicateTrtId'),
            trackers: app.controllers.downloadWizard.model.get('trackers')
        };
    },

    componentDidMount: function(){

        app.controllers.downloadWizard.model.on('change:duplicateTrtId change:trackers', this.changeModel, this);
    },

    componentWillUnmount:function(){

        app.controllers.downloadWizard.model.off('change:duplicateTrtId change:trackers', this.changeModel, this);
    },

    changeModel: function(){

        this.setState({
            duplicateTrtId: app.controllers.downloadWizard.model.get('duplicateTrtId'),
            trackers: app.controllers.downloadWizard.model.get('trackers')
        });
    },

    onKeyDown: function(e){

        if(e.keyCode == 27){

            stopEventBubble(e);
            this.cancel();
        }
        if(e.keyCode == 13){

            stopEventBubble(e);
            this.apply();
        }
    },

    apply: function(){

        app.controllers.downloadWizard.addTrackers();
    },

    cancel: function(){

        app.controllers.downloadWizard.cancel(true, false);
    },

    render: function() {

        return (
            <div id="download-wiz-add-source" className="popup__overlay_adddownload popup_exist"
                 onMouseDown={this.toolbarDragStart} onDoubleClick={this.toolbarDoubleClick}
                 onKeyDown={this.onKeyDown}>
                <div className="mount"></div>
                <div className="popup_window popup_adddownload">

                    <div className="add_url">

                        <div className="header">
                            <div>{__('Torrent already exists')}</div>
                            <a href="#" className="close_button" onClick={this.cancel}></a>
                        </div>

                        <div className="center">
                            <div className="txt">{__('Want to load its trackers?')}</div>
                        </div>

                        <div className="bottom_add_ul bottom">
                            <div className="group_button">
                                <button className="left_button cancel linkblock" title=""
                                        onClick={this.cancel}
                                        onMouseDown={this.buttonMouseDown}>{__('Cancel')}</button>
                                <button className="right_button linkblock" title=""
                                        onClick={this.apply}
                                        onMouseDown={this.buttonMouseDown}>{__('OK')}</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
});


var DownloadWizardAdd = React.createClass({

    mixins: [ButtonMixin, ToolbarDragMixin],

    toolbarDragId: 'download-wiz-add-source',

    getInitialState: function() {

        return {
            rawSource: app.controllers.downloadWizard.model.get('rawSource'),
            requestingDownloadInfo: app.controllers.downloadWizard.model.get('requestingDownloadInfo'),
            downloadInfoErrorMessage: app.controllers.downloadWizard.model.get('downloadInfoErrorMessage'),
            dragNDropInProgress: app.controllers.downloadWizard.model.get('dragNDropInProgress'),
            showBasicAuthForm: app.controllers.downloadWizard.model.get('showBasicAuthForm'),
            //useBasicAuth: app.controllers.downloadWizard.model.get('useBasicAuth'),
            basicAuthLogin: app.controllers.downloadWizard.model.get('basicAuthLogin'),
            basicAuthPass: app.controllers.downloadWizard.model.get('basicAuthPass'),
            basicAuthSaveFlag: app.controllers.downloadWizard.model.get('basicAuthSaveFlag'),
            youtubeChannelVideosDownload: app.controllers.downloadWizard.model.get('youtubeChannelVideosDownload'),
            youtubePlaylistDownload: app.controllers.downloadWizard.model.get('youtubePlaylistDownload'),
        };
    },

    componentDidMount: function(){

        app.controllers.downloadWizard.model.on('change:rawSource', this.changeRawSource, this);
        app.controllers.downloadWizard.model.on('change:downloadInfoErrorMessage change:requestingDownloadInfo change:dragNDropInProgress', this.changeModel, this);
        app.controllers.downloadWizard.model.on('change:youtubeChannelVideosDownload change:youtubePlaylistDownload', this.changeModel, this);

        app.controllers.downloadWizard.model.on('change:basicAuthLogin change:basicAuthPass change:basicAuthSaveFlag change:showBasicAuthForm', this.changeBasicAuth, this);
    },

    componentWillUnmount:function(){

        app.controllers.downloadWizard.model.off('change:rawSource', this.changeRawSource, this);
        app.controllers.downloadWizard.model.off('change:downloadInfoErrorMessage change:requestingDownloadInfo change:dragNDropInProgress', this.changeModel, this);
        app.controllers.downloadWizard.model.off('change:youtubeChannelVideosDownload change:youtubePlaylistDownload', this.changeModel, this);

        app.controllers.downloadWizard.model.off('change:basicAuthLogin change:basicAuthPass change:basicAuthSaveFlag change:showBasicAuthForm', this.changeBasicAuth, this);
    },

    changeModel: function(){

        this.setState({
            rawSource: app.controllers.downloadWizard.model.get('rawSource'),
            requestingDownloadInfo: app.controllers.downloadWizard.model.get('requestingDownloadInfo'),
            downloadInfoErrorMessage: app.controllers.downloadWizard.model.get('downloadInfoErrorMessage'),
            dragNDropInProgress: app.controllers.downloadWizard.model.get('dragNDropInProgress'),
            youtubeChannelVideosDownload: app.controllers.downloadWizard.model.get('youtubeChannelVideosDownload'),
            youtubePlaylistDownload: app.controllers.downloadWizard.model.get('youtubePlaylistDownload'),
        });
    },

    changeBasicAuth: function(){

        this.setState({
            showBasicAuthForm: app.controllers.downloadWizard.model.get('showBasicAuthForm'),
            //useBasicAuth: app.controllers.downloadWizard.model.get('useBasicAuth'),
            basicAuthLogin: app.controllers.downloadWizard.model.get('basicAuthLogin'),
            basicAuthPass: app.controllers.downloadWizard.model.get('basicAuthPass'),
            basicAuthSaveFlag: app.controllers.downloadWizard.model.get('basicAuthSaveFlag')
        });
    },

    changeRawSource: function(){

        this.setState({rawSource: app.controllers.downloadWizard.model.get('rawSource')});
    },

    rawSourceChange: function(event) {

        var changes = {
            rawSource: event.target.value
        };
        if (this.state.downloadInfoErrorMessage != ''){
            changes.downloadInfoErrorMessage = '';
        }
        app.controllers.downloadWizard.model.set(changes);
    },

    onKeyDown: function(e){
        //this event is handled by method webui\react\jsx-tpl\rjs-download-wizard.tpl.js::handleKeydown()
        
        if(e.keyCode == 27){

            stopEventBubble(e);
            app.controllers.downloadWizard.cancel(true, false);
        }
        if(e.keyCode == 13){

            stopEventBubble(e);
            app.controllers.downloadWizard.applySource();
        }
    },

    onDrop: function(e){

        app.controllers.downloadWizard.model.set({dragNDropInProgress: false});
        stopEventBubble(e);
        var _source = fdmApp.dragDrop.lastDroppedSource();
        app.controllers.downloadWizard.selectByDragDrop(_source);
    },

    onDragLeave: function(){

        app.controllers.downloadWizard.onDragLeave();
    },

    onDragOver: function(e){

        e.dataTransfer.dropEffect = 'copy';
    },

    dropLayerMouseMoveTimeout: 0,
    dropLayerMouseMove: function(){

        if (this.dropLayerMouseMoveTimeout > 0)
            return;

        this.dropLayerMouseMoveTimeout = setTimeout(function(){

            app.controllers.downloadWizard.model.set({dragNDropInProgress: false});
            this.dropLayerMouseMoveTimeout = 0;
        }.bind(this), 500);
    },

    applySource: function(){

        app.controllers.downloadWizard.applySource();
    },

    cancelByButton: function(){
console.log('cancelByButton 1');

        if (app.controllers.downloadWizard.model.get('youtubeChannelVideosDownload')) {        
            youtubeChannelParser.stop_createYoutubeVideosList = true;
        }

        app.controllers.downloadWizard.cancel(true, false);
    },

    basicLoginChange: function(e){

        app.controllers.downloadWizard.model.set({basicAuthLogin: e.target.value});
    },

    basicPassChange: function(e){

        app.controllers.downloadWizard.model.set({basicAuthPass: e.target.value});
    },

    basicAuthSaveFlagChange: function(e){

        app.controllers.downloadWizard.model.set({basicAuthSaveFlag: e.target.checked});
        app.appViewManager.setDownloadsWizardState('basicAuthSaveFlag', e.target.checked);
    },

    youtubeChannelVideosDownloadChange: function(e){

       app.controllers.downloadWizard.model.set({youtubeChannelVideosDownload: e.target.checked});
    },

    youtubePlaylistDownloadChange: function(e){

       app.controllers.downloadWizard.model.set({youtubePlaylistDownload: e.target.checked});
    },

    openTrtFile: function () {

        app.controllers.menu.openTrtFile();
    },

    render: function() {

        var model = app.controllers.downloadWizard.model;
        //var view_model = app.controllers.downloadWizard.view_model;
        var rawSource = this.state.rawSource;

        var error = this.state.downloadInfoErrorMessage;
        
        var isYoutubeChannelVideosUrl =  fdm.urlUtils.isYoutubeChannelVideosUrl(rawSource);
        var isYoutubePlaylistUrl =  fdm.urlUtils.isYoutubePlaylistUrl(rawSource);

        return (
            <div id="download-wiz-add-source" className="temporary-style popup__overlay_adddownload"
                 onMouseDown={this.toolbarDragStart} onDoubleClick={this.toolbarDoubleClick}
                 //id for moving by head (mac)
                onKeyDown={this.onKeyDown}
                onDrop={this.onDrop}
                //onDragOver={function(event) { event.dataTransfer.effectAllowed = 'copy'; stopEventBubble(event) }}
                //onDragEnter={_.bind(view_model.onDragEnter, view_model)}
                //onDragLeave={_.bind(view_model.onDragLeave, view_model)}
                >
                <div className="mount"></div>
                <div className="popup_window popup_adddownload popup">

                    <div className={rjs_class({
                        add_url: true,
                        show_proxy: this.state.showBasicAuthForm
                    })}>

                        <div className="header">
                            <div>{__('Add download')}</div>
                            <div className="close_button" onClick={this.cancelByButton}></div>
                        </div>

                        <div className="center_add_ul center">
                            <label>{__('Enter URL or choose torrent file')}</label>
                            <input id="rawSource" type="text" className="select-text" spellCheck="false"
                                   disabled={this.state.requestingDownloadInfo}
                                   value={rawSource}
                                   defaultValue={rawSource} onChange={this.rawSourceChange} />
                               
                            {/*   
                            <div id="download-channel-checkbox-div" style={{display: (isYoutubeChannelVideosUrl && !model.attributes.onApiOpened ? 'block' : 'none')}}>
                                <input type="checkbox" name="checkbox" id="download-channel-checkbox" value="download-youtube-channel" />
                                <label htmlFor="download-channel-checkbox">Download Youtube Channel Videos</label>
                            </div>      
                            */}
                            <button className="button_folder linkblock"
                                    style={{opacity: this.state.requestingDownloadInfo ? 0.6 : 1 }}
                                    disabled={this.state.requestingDownloadInfo}
                                    onClick={this.openTrtFile}
                                    onMouseDown={this.buttonMouseDown}></button>
                                    
                            <div className="add_channel" id="download-channel-checkbox-div" style={{display: (isYoutubeChannelVideosUrl ? 'block' : 'none')}}>
                                <input checked={this.state.youtubeChannelVideosDownload} defaultChecked={this.state.youtubeChannelVideosDownload}
                                       onChange={this.youtubeChannelVideosDownloadChange} disabled={this.state.requestingDownloadInfo}
                                       type="checkbox" name="checkbox" id="download-channel-checkbox" value="download-youtube-channel" />
                                <label htmlFor="download-channel-checkbox">{__('Download YouTube channel')}</label>
                            </div>

                            <div className="add_channel" style={{display: (isYoutubePlaylistUrl ? 'block' : 'none')}}>
                                <input checked={this.state.youtubePlaylistDownload} defaultChecked={this.state.youtubePlaylistDownload}
                                       onChange={this.youtubePlaylistDownloadChange} disabled={this.state.requestingDownloadInfo}
                                       type="checkbox" name="checkbox" id="download-playlist-checkbox" value="download-youtube-channel" />
                                <label htmlFor="download-playlist-checkbox">{__('Download YouTube playlist')}</label>
                            </div>

                        {this.state.showBasicAuthForm ?
                            <div className="wrapper_proxy">

                                <label htmlFor="use-http">{__('Authorization required:')}</label>
                                {/*
                                <input checked={this.state.useBasicAuth}
                                       defaultChecked={this.state.useBasicAuth}
                                       onChange={this.useBasicAuthChange}
                                       type="checkbox" id="use-http"/>
                                <label htmlFor="use-http">{__('Use HTTP Authorization')}</label>
                                 */}
                                <div className={rjs_class({
                                    wrap_form: true,
                                    //disabled: !this.state.useBasicAuth
                                })}>
                                    <label>{__('Login')}</label>
                                    <input id="basic_auth_login"
                                           //disabled={!this.state.useBasicAuth}
                                           value={this.state.basicAuthLogin}
                                           defaultValue={this.state.basicAuthLogin}
                                           onChange={this.basicLoginChange}
                                           type="text"/>
                                    <label>{__('Password')}</label>
                                    <input
                                           //disabled={!this.state.useBasicAuth}
                                           value={this.state.basicAuthPass}
                                           defaultValue={this.state.basicAuthPass}
                                           onChange={this.basicPassChange}
                                           type="password"/>
                                    <input
                                           //disabled={!this.state.useBasicAuth}
                                           checked={this.state.basicAuthSaveFlag}
                                           defaultChecked={this.state.basicAuthSaveFlag}
                                           onChange={this.basicAuthSaveFlagChange}
                                           type="checkbox" id="save-pass"/>
                                    <label htmlFor="save-pass">{__('Save')}</label>
                                </div>
                            </div>
                            : null }
                        </div>

                        <div className="bottom_add_ul bottom">

                            <span className="error-message">
                                {!this.state.requestingDownloadInfo ?
                                    <span>{error}</span>
                                    :null }
                            </span>

                            <div style={{display: this.state.requestingDownloadInfo ? 'flex' : 'none'}}
                                className="loading">
                                <img src="preloading_FDM.gif" />
                                <span>{__('Requesting download info...')}</span>
                            </div>
                            <div className="group_button">
                                <button className="left_button cancel linkblock" title=""
                                    onClick={this.cancelByButton}
                                    onMouseDown={this.buttonMouseDown}>{__('Cancel')}</button>

                                {this.state.requestingDownloadInfo ?

                                    <button className="right_button linkblock" title=""
                                            onClick={this.applySource}
                                            disabled={rawSource==""
                                                || isYoutubeChannelVideosUrl && this.state.youtubeChannelVideosDownload
                                                || isYoutubePlaylistUrl && this.state.youtubePlaylistDownload}
                                            onMouseDown={this.buttonMouseDown}>
                                        { __('Download') }
                                    </button>
                                    :
                                    <button className="right_button linkblock" title=""
                                            onClick={this.applySource}
                                            disabled={this.state.requestingDownloadInfo || rawSource==""}
                                            onMouseDown={this.buttonMouseDown}>
                                        { this.state.showBasicAuthForm && error && error.length > 0 ? __('Retry') : __('OK')}
                                    </button>
                                }
                            </div>
                        </div>
                    </div>
                {/*<!--bottom-->*
                    <div className="bottom">
                        <div className="group_button">
                            <button className="left_button cancel linkblock" title=""
                                onClick={_.bind(view_model.cancelByButton, view_model)}
                                data-bind="click: cancelByButton, __:'Cancel'">{__('Cancel')}</button>
                            <button className="right_button linkblock" title=""
                                onClick={_.bind(view_model.applySource, view_model)}>{__('OK')}</button>
                        </div>
                    </div>
                    *<!--end bottom-->*/}
                </div>

                {this.state.dragNDropInProgress ?
                    <div onDragLeave={this.onDragLeave}
                         //onDragOver={this.onDragOver}
                         onMouseMove={this.dropLayerMouseMove}
                         className="drag-n-drop-dialog-layer">
                    </div>
                    : null}

            </div>
        );
    }
});

var DownloadWizardSource = React.createClass({

    mixins: [ButtonMixin, ToolbarDragMixin],

    toolbarDragId: 'download-wiz-source-info',

    getInitialState: function() {
        var state = app.controllers.downloadWizard.model.toJSON();

        state.startName = state.name;
        //state.nameValue = state.name;
        state.divSelectOpened = false;
        state.divFolderSelectOpened = false;
        state.divVideoQualitySelectOpened = false;
        state.maxWidth4Youtube = 0;
        state.catchLinksCheckbox = false;
        return state;
    },

    componentDidMount: function(){

        //this.nameLengthFix = _.bind(this.nameLengthFix, this);

        this.onResize = function(){

            this.forceUpdate();
        }.bind(this);

        app.controllers.downloadWizard.model.on('change', this.modelChange, this);
        app.controllers.downloadWizard.model.get('fileTree').on('change', this.fileTreeChange, this);
        window.addEventListener('resize', this.onResize);
        //window.addEventListener('resize', this.nameLengthFix);
        //this.nameLengthFix();
        _.defer(function(){

            if (!this.isMounted())
                return;
            this.selectLengthFix();
        }.bind(this));
    },

    componentWillUnmount:function(){

        app.controllers.downloadWizard.model.off('change', this.modelChange, this);
        if (this.state.fileTree)
            this.state.fileTree.off('change', this.fileTreeChange, this);
        window.removeEventListener('resize', this.onResize);
        //window.removeEventListener('resize', this.nameLengthFix);

        if (this.state.scheduler)
            this.state.scheduler.off('change', this.changeScheduler, this);
    },
    targetFolderChange: function(event) {

        app.controllers.downloadWizard.model.set({targetFolder: event.target.value});
    },
    modelChange: function(model) {

        if (model.changed && model.changed.fileTree){
            if (this.state.fileTree)
                this.state.fileTree.off('change', this.fileTreeChange, this);
            model.changed.fileTree.on('change', this.fileTreeChange, this);
        }

        this.setState(app.controllers.downloadWizard.model.toJSON());

        //var model = app.controllers.downloadWizard.model;
        //var name = model.set('name', event.target.value);
        //this.setState({nameValue: event.target.value}, null);
    },

    selectLengthFixInProgress: false,
    fileTreeChange: function(){

        this.setState({fileTree: app.controllers.downloadWizard.model.get('fileTree')});

        if (!this.selectLengthFixInProgress){
            this.selectLengthFixInProgress = true;
            _.defer(function(){

                    if (!this.isMounted())
                        return;
                    this.selectLengthFix();
                }.bind(this));
        }
    },

    selectYoutubeFile: function(file_id, e){

        stopEventBubble(e);
        app.controllers.downloadWizard.toggleYoutubeChecked(file_id);

        this.divSelectClose();
    },

    changeName: function(){
        var new_name = app.controllers.downloadWizard.model.get('name');
        this.setState({name: new_name});
        //if (new_name != '')
        //    _.defer(this.nameLengthFix);
    },

    selectLengthFix: function(){

        this.selectLengthFixInProgress = false;

        if (!this.isMounted())
            return;

        var row = ReactDOM.findDOMNode(this);

        var n = row.getElementsByClassName('list');
        if (!n || !n.length)
            return;

        n = n[0];

        var max_width = 0;
        for (var i = 0; i < n.childNodes.length; i++){

            var c = n.childNodes[i];

            if (c.childNodes.length)
                c = c.childNodes[0];

            max_width = Math.max(max_width, c.getBoundingClientRect().width);
        }

        if (max_width > 0){
            this.setState({maxWidth4Youtube: max_width + 50});
        }
    },

    changeFileName: function(e){

        app.controllers.downloadWizard.model.set({name: e.target.value});
    },

    setCheck: function(value, e){

        stopEventBubble(e);
        app.controllers.downloadWizard.setCheck(this.state.fileTree, value);
    },

    openFolderDialog: function(){

        app.controllers.downloadWizard.openFolderDialog();
    },

    cancel: function(e){

        stopEventBubble(e);
        app.controllers.downloadWizard.cancel(true, false);
    },

    lastFolderChange: function(value, e){

        stopEventBubble(e);
        app.controllers.downloadWizard.model.set({targetFolder: value});
        this.divFolderSelectClose();
    },

    createDownload: function(){

        app.controllers.downloadWizard.createDownloadAfterCheck();
    },

    resumeDownload: function(){

        app.controllers.downloadWizard.resumeDownload();
    },

    cancelByButton: function(){
        app.controllers.downloadWizard.cancel(true, false);
    },

    getYoutubeFileName: function(f_name){

        var m = f_name.match(/\[(.*?)\]/);
        if (m)
            return m[1];

        return f_name;
    },

    divSelectToggle: function(e){

        stopEventBubble(e);
        this.setState({
            divSelectOpened: !this.state.divSelectOpened
        });
    },

    divSelectClose: function(e){

        stopEventBubble(e);

        if (this.state.divSelectOpened)
            this.setState({divSelectOpened: false});
    },

    divFolderSelectToggle: function(e){

        stopEventBubble(e);
        this.setState({
            divFolderSelectOpened: !this.state.divFolderSelectOpened
        });
    },

    divFolderSelectClose: function(e){
        stopEventBubble(e);

        if (this.state.divFolderSelectOpened)
            this.setState({divFolderSelectOpened: false});
    },

    /* Video quality select for YouTube channel - BEGIN ------------------------------ */
    divVideoQualitySelectToggle: function(e){
        stopEventBubble(e);
        this.setState({
            divVideoQualitySelectOpened: !this.state.divVideoQualitySelectOpened
        });
    },   
    
    divVideoQualitySelectClose: function(e){
        stopEventBubble(e);

        if (this.state.divVideoQualitySelectOpened)
            this.setState({divVideoQualitySelectOpened: false});
    },    
    
    VideoQualityChange: function(value, e){

        stopEventBubble(e);
        app.controllers.downloadWizard.model.set({VideoQualityForChannel: value});      
        this.divVideoQualitySelectClose();
    },    
    /* Video quality select for YouTube channel - END ------------------------------ */
    
    setVideosCheck: function(value, e){
        stopEventBubble(e);
        
        for (video_key in app.controllers.downloadWizard.model.attributes.youtubeChannelVideos.videos) {
            app.controllers.downloadWizard.model.attributes.youtubeChannelVideos.videos[video_key].checked = value;
        }

        app.controllers.downloadWizard.model.trigger('change:youtubeChannelVideos');
        
        this.forceUpdate();
    },    


    catchLinksChange: function(e){

        app.controllers.downloadWizard.model.set({setCatchLinksCheckbox: e.target.checked}, {silent: true});
        this.setState({
            catchLinksCheckbox: e.target.checked
        });
    },

    toggleScheduler: function(){

        var changes = {
            enableScheduler: !this.state.enableScheduler
        };

        if (!this.state.scheduler){

            var scheduler = new fdm.models.ScheduleTimetable;
            var j_str = JSON.stringify(app.controllers.downloadWizard.currentScheduleTimetable.toJSON());
            scheduler.set(JSON.parse(j_str));

            scheduler.on('change', this.changeScheduler, this);

            changes.scheduler = scheduler;
        }

        app.controllers.downloadWizard.model.set(changes);
    },

    changeScheduler: function () {

        this.forceUpdate();
    },
    
    toggleAddDateToVideos: function(e){
        app.controllers.downloadWizard.model.set({youtubeChannelAddDateInFilename: e.target.checked});
    },
    
    loadMoreVideos: function() {
        app.controllers.downloadWizard.ytLoadMoreVideos();
    },

    tryLoadingVideosAgain: function() {
        app.controllers.downloadWizard.tryLoadingVideosAgain();
    },

    channelListOnScroll: function(e) {

        if (this.state.loadMoreVideosRunning || !this.state.youtubeChannelNextPageUrl.length) {
            return;
        }

        let el = e.target;
        const need_pagination = el.scrollTop >= el.scrollHeight - el.clientHeight*5/4;

        if (need_pagination) {
            this.loadMoreVideos();
        }
    },

    render: function() {

        var model = app.controllers.downloadWizard.model;
        var filesCount = this.state.filesCount;
        var viewType = this.state.viewType;
        var size = this.state.size;
        var source = this.state.source;
        var type = this.state.type;
        var lastFolders = this.state.lastFolders;

        var targetFolder = this.state.targetFolder;
        var name = this.state.name;

        var targetFolderIsValid = this.state.targetFolderIsValid;
        var targetFolderDiscIsFull = this.state.targetFolderDiscIsFull;

        var errorMessage = '';
        if (this.state.targetFolderErrorMessage.length) {
            errorMessage = this.state.targetFolderErrorMessage;
        } else if (this.state.batchDownloadErrorMessage.length) {
            errorMessage = this.state.batchDownloadErrorMessage;
        }

        var startable = this.state.startable;

        var file_tree = this.state.fileTree;

        var selected_files = {};
        var opened_folders = {};
        var selected = file_tree.get('selectedList').models;
        var opened = file_tree.get('openedFolders').models;

        for (var i = 0; i < selected.length; i++ ){
            selected_files[selected[i].get('id')] = selected[i];
        }
        for (var i = 0; i < opened.length; i++ ){
            opened_folders[opened[i].get('id')] = opened[i];
        }

        var thumbnail_url = model.getThumbnailUrl();

        var list_links = false;
        if (this.state.listLinksIsShown || this.state.youtubeChannelVideosDownload || this.state.youtubePlaylistDownload)
            list_links = true;
        var youtube_channel_videos = false;
        if (this.state.youtubeChannelVideosDownload || this.state.youtubePlaylistDownload) {
            youtube_channel_videos = true;
        }

        let youtube_channel_videos_title = '';
        if (youtube_channel_videos) {
            if (this.state.youtubePlaylistDownload) {
                youtube_channel_videos_title = __('Download YouTube playlist');
            } else {
                youtube_channel_videos_title = __('Download YouTube channel');
            }
        }

        var show_scheduler_message = false;

        if (this.state.enableScheduler && this.state.scheduler){

            var days = this.state.scheduler.get('data').daysEnabled;

            show_scheduler_message = (days[1] + days[2] + days[3] + days[4] + days[5] + days[6] + days[7]) == 0;
        }

        var popup_css = {};

        if ( filesCount > 1 &&
            (list_links || type == fdm.models.DownloadType.Trt && viewType == 'tree') || youtube_channel_videos){

            var window_height = window.innerHeight;
            var min_height = 370;
            var start_height = 310;
            var max_height = 670;

            if (this.state.enableScheduler){
                min_height = 460;
                start_height = 380;
            }

            var rows_count = filesCount;
            var min_window_height = window_height - 150;
            if (youtube_channel_videos && this.state.youtubeChannelVideos.videos && this.state.youtubeChannelVideos.videos.length) {
                rows_count = this.state.youtubeChannelVideos.videos.length;
                min_height = 400;
                start_height = 400;
                min_window_height = window_height - 50;
            }

            if (rows_count > 0) {
                var popup_height = Math.min(start_height + rows_count * 20, max_height, min_window_height);
                popup_height = Math.max(popup_height, min_height);

                popup_css.height = popup_height + 'px';
                popup_css.marginTop = -(popup_height/2) - 20 + 'px';
            }
        }

        var diskFreeSpace = model.get('diskFreeSpace');
        var selectedSizeBytes = model.get('selectedSizeBytes');

        //download Youtube channel icon
        if (youtube_channel_videos) {
            var channel_icon_img = new Image();
            channel_icon_img.src = this.state.youtubeChannelVideos.channel_info.icon_url;
            channel_icon_img.className = 'channel_pic';
            channel_icon_img.onload = function(){                
                var div_info = document.getElementById('channel_info');
                
                if (div_info.getElementsByTagName('img')) {
                    div_info.getElementsByTagName('img')[0].remove();
                }
                //div_info.appendChild(channel_icon_img);
                div_info.insertBefore(channel_icon_img, div_info.firstChild);
            }
            channel_icon_img.onerror = function () {

                var img = new Image();
                img.className = 'channel_pic';
                img.src = 'v2_images/default_channel_icon.png';

                var div_info = document.getElementById('channel_info');
                if (div_info.getElementsByTagName('img')) {
                    div_info.getElementsByTagName('img')[0].remove();
                }
                div_info.insertBefore(img, div_info.firstChild);
            }

            var window_width = window.innerWidth;
            var popup_width = Math.round(window_width*0.75);
            if (popup_width > 562) {
                popup_css.width = popup_width + 'px';
                popup_css.marginLeft = -(popup_width/2) + 'px';
            }
        }

        return (
            <div id="download-wiz-source-info"
                 onMouseDown={this.toolbarDragStart} onDoubleClick={this.toolbarDoubleClick}
                //id for moving by head (mac)
                className={rjs_class({
                    'temporary-style': true,
                    'download-wiz-source-info': true,
                    'popup__overlay': true,
                    'single-file': !list_links && (viewType == 'single' || type == fdm.models.DownloadType.YouTubeVideo),
                    is_trt: type == fdm.models.DownloadType.Trt,
                    files_tree: (list_links || viewType != 'single') && type != fdm.models.DownloadType.YouTubeVideo,
                    with_note: this.state.suggestEquivalent > 0,
                    youtube_channel: youtube_channel_videos,
                    youtube_playlist: this.state.youtubePlaylistDownload
                })}
                onDragOver={function(event) {
                    stopEventBubble(event);
                    event.dataTransfer.effectAllowed = 'copy'; event.dataTransfer.dropEffect = 'none';
                }}>
                <div className="mount"></div>
                <div className={rjs_class({
                popup: true,
                waiting: !filesCount && !list_links,
                'youtube': type == fdm.models.DownloadType.YouTubeVideo,
                scheduler_on: this.state.enableScheduler,
                no_load_more: youtube_channel_videos && !this.state.enableScheduler,
                })}

                style={popup_css}>
                {/*<!--top-->*/}

                    <div className="header">
                        {type == fdm.models.DownloadType.Trt ?
                            <div>{__('New torrent')}</div>
                            :
                            (list_links ?
                                (youtube_channel_videos ?
                                    <div>{youtube_channel_videos_title}</div> : <div>{__('New files')}</div>)
                                : ( type == fdm.models.DownloadType.YouTubeVideo ?
                                        <div>{__('New video')}</div>
                                        :
                                            <div>{__('New file')}</div>
                                    )
                            )
                        }

                        <div className="close_button" onClick={this.cancelByButton}></div>
                    </div>
                    
                    <div className="center">

                        {type == fdm.models.DownloadType.Trt ?
                            <div className="popup_top">
                                <div className="for_copy title">{this.state.startName}</div>
                            </div>
                            : null }

                    <div>
                    
                        <div className="center_left">
                        { youtube_channel_videos  ?
                            <div className="channel_info" id="channel_info">                            
                            <img src="loading_light_bg.gif" className="channel_pic" />
                                <div className="overflow">
                                    <div className="channel_name">{this.state.youtubeChannelVideos.channel_info.name}</div>
                                    <div className="count">{'\u00a0'}</div>
                                </div>
                            </div>
                            : null }

                            <div className="saveto">

                                <span className="title-input">{__('Save to')}</span>

                                <div className={rjs_class({'cont_form' : true, error : !targetFolderIsValid, empty_list: lastFolders.length == 0})}>

                                    <div id="containerTargetFolder" className="inselect wrapper_inselect" onClick={this.divFolderSelectToggle}>

                                        <div className="input_wrapper" onClick={stopEventBubble}>
                                            <input value={targetFolder} defaultValue={targetFolder} onChange={this.targetFolderChange}
                                                id="targetFolder" autoComplete="off" spellCheck="false" type="text" className="select-text"
                                                onFocus={function(){document.getElementById('containerTargetFolder').className='inselect wrapper_inselect focus'}}
                                                onBlur={function(){document.getElementById('containerTargetFolder').className='inselect wrapper_inselect'}} />
                                        </div>

                                        <div className="transparent_select" style={{display: this.state.divFolderSelectOpened ? 'block' : 'none'}}
                                             onClick={this.divFolderSelectClose}></div>
                                        <div className="dropdown_button"></div>

                                        { this.state.divFolderSelectOpened ?
                                            <div className="list">

                                                {lastFolders.map(function(folder, index){

                                                    if (folder == '')
                                                        return;

                                                    return (
                                                        <div key={index} onClick={_.partial(this.lastFolderChange, folder)}><span>{folder}</span></div>
                                                    );
                                                }.bind(this))}

                                            </div>
                                            : null }
                                    </div>
                                    <button className="button_folder linkblock" title={__('Select folder')}
                                            onClick={this.openFolderDialog}
                                            onMouseDown={this.buttonMouseDown}></button>

                                </div>

                            </div>
                        </div>
                                        
                        <div className="block_element">

                            { type == fdm.models.DownloadType.Trt && viewType == 'tree' || list_links ?

                                <label htmlFor="sub-folder">{__('Create subfolder')}</label>
                                :
                                <label className="title-input">{__('File name')}</label>
                            }

                            <input className="js-name-div name" type="text"
                                   value={name}
                                   defaultValue={name}
                                   onChange={this.changeFileName}
                                   disabled={(type == fdm.models.DownloadType.Trt || list_links) && !this.state.createSubDirectory}/>

                            {type != fdm.models.DownloadType.Trt?
                                <label className="link_name for_copy">{source}</label>
                                : null }


                        </div>

                        <div className="youtube_wrapper" style={{display: type == fdm.models.DownloadType.YouTubeVideo ? 'block' : 'none'}}>
                            <span className="title-input">{__('Quality:')}</span>
                            <div className="youtube-files-select">
                                <div className="transparent_select" style={{display: this.state.divSelectOpened ? 'block' : 'none'}} onMouseDown={this.divSelectClose}></div>
                                <div className="wrapper_inselect" style={{
                                    width: this.state.maxWidth4Youtube > 0 ? this.state.maxWidth4Youtube + 'px' : null
                                }} onMouseDown={this.divSelectToggle}>

                                    {function(){

                                        var current = false;
                                        for (var i = 0; i < file_tree._children.models.length; i++){
                                            if (file_tree._children.models[i].get('checked'))
                                                current = file_tree._children.models[i];
                                        }
                                        if (!current && file_tree._children.models.length){

                                            current = file_tree._children.models[0];
                                        }

                                        if (current){

                                            var file_data = current.get('data');
                                            return (
                                                <span>{this.getYoutubeFileName(file_data.name) + ' ' + fdm.sizeUtils.bytesAsText(file_data.size)}</span>
                                            );
                                        }

                                        return null;

                                    }.apply(this)}

                                    <div className="list" onMouseDown={stopEventBubble} style={{visibility: this.state.divSelectOpened ? 'visible' : 'hidden'}}>
                                        {file_tree._children.models.map(function(file){

                                            var file_data = file.get('data');

                                            return (
                                                <div onMouseDown={_.partial(this.selectYoutubeFile, file_data.index)}>
                                                    <span>{this.getYoutubeFileName(file_data.name) + ' ' + fdm.sizeUtils.bytesAsText(file_data.size)}</span>
                                                </div>
                                            );

                                        }.bind(this))}
                                    </div>

                                    <div className="dropdown_button"></div>

                                </div>

                            </div>
                        </div>


                        {type == fdm.models.DownloadType.Trt && viewType == 'tree' && file_tree && file_tree._children
                            && file_tree._children.models ?
                            <label>{__('Files')}</label>
                            : null }

                        {list_links ?
                            <label>{youtube_channel_videos ? __('Videos') : __('Download links')}</label>
                            : null }

                        {(list_links || type != fdm.models.DownloadType.YouTubeVideo && viewType == 'tree'
                        && file_tree && file_tree._children && file_tree._children.models) &&  !youtube_channel_videos ?

                            <div className="select_buttons">
                                <div onClick={_.partial(this.setCheck, true)} href="#">{__('Select all')}</div>
                                <div onClick={_.partial(this.setCheck, false)} href="#">{__('Select none')}</div>
                            </div>

                            : null }
                            
                        {youtube_channel_videos ?
                            <div className="select_buttons">
                                <div onClick={_.partial(this.setVideosCheck, true)} href="#">{__('Select all')}</div>
                                <div onClick={_.partial(this.setVideosCheck, false)} href="#">{__('Select none')}</div>
                            </div>                        
                        : null }


                        <div className={rjs_class({center_right: true, batch: list_links})} style={{display: type != fdm.models.DownloadType.YouTubeVideo && viewType == 'tree' || list_links && !youtube_channel_videos ? 'block' : 'none'}}>

                            <div className="wrapper_tree">
                                <div className="tree">

                                    {function(){

                                        var files;

                                        if (list_links){
                                            files = file_tree._children;
                                        }
                                        else{
                                            if (!file_tree || !file_tree._children || !file_tree._children.models
                                                || !file_tree._children.models[0] || !file_tree._children.models[0]._children
                                                || !file_tree._children.models[0]._children.models)
                                                return null;

                                            files = file_tree._children.models[0]._children.models;
                                        }

                                        return (

                                            <ul>
                                                {files.map(function(file, index){

                                                    return (

                                                        <WizardFilesTable key={file.id}
                                                                          listLinks={list_links}
                                                                          is_youtube={type == fdm.models.DownloadType.YouTubeVideo} is_root={true}
                                                                          treeNode={file} root_tree={file_tree}
                                                                          selected_files={selected_files} opened_folders={opened_folders} />


                                                    );

                                                })}
                                            </ul>

                                        );

                                    }.apply(this)}

                                </div>
                            </div>
                            <div className="bottom_line" style={{display: 'none'}}></div>
                        </div>


                        <div className={rjs_class({center_right: true, batch: true})} style={{display: youtube_channel_videos ? 'block' : 'none'}}
                             onScroll={this.channelListOnScroll}>

                            <div className="wrapper_tree">
                                <div className="tree">
                                    <YoutubeChannelVideos videosObj={this.state.youtubeChannelVideos} />
                                    {this.state.loadMoreVideosError ?
                                        <div className="yt_channel_spinner">
                                            <span className="error">{this.state.loadMoreVideosError}</span>
                                            <button onClick={this.tryLoadingVideosAgain}>{__('Try again')}</button>
                                        </div>
                                        : null}
                                    {this.state.loadMoreVideosRunning ?
                                        <div className="yt_channel_spinner">
                                            <img src="loading_light_bg.gif"/>
                                        </div>
                                        : null}
                                </div>
                            </div>
                            <div className="bottom_line" style={{display: 'none'}}></div>
                        </div>

                        <div className="loader" style={{display: !filesCount && !list_links ? 'block' : 'none'}}>
                            <img onDrag={stopEventBubble} onDrop={stopEventBubble} onDragStart={stopEventBubble} src="preloading_FDM.gif" width="40" height="40" alt="" />
                        </div>
                    </div>                    
                    
                    { /* !this.state.enableScheduler && youtube_channel_videos &&
                        app.controllers.downloadWizard.model.attributes.youtubeChannelNextPageUrl.length > 0  ?
                        <button id="load_more_btn" className="load_more" onClick={this.loadMoreVideos}>{__('Load More')}</button>
                        : null
                    */ }
                    
                    {youtube_channel_videos ?
                        <div className="add_date">
                            <input type="checkbox" id="add-date" onClick={this.toggleAddDateToVideos}
                                   checked={this.state.youtubeChannelAddDateInFilename}
                                   defaultChecked={this.state.youtubeChannelAddDateInFilename}/>
                            <label htmlFor="add-date">{__('Add YouTube upload date to file name')}</label>
                        </div>
                        : null
                    }

                        {!filesCount && !list_links ?
                            null
                            :
                            <div>
                                <div className="enable_scheduler">
                                    <input type="checkbox" id="scheduler" />
                                    <label htmlFor="scheduler" onClick={this.toggleScheduler}>
                                        {__('Scheduler')}
                                    </label>
                                </div>

                                {this.state.enableScheduler ?

                                    <div className="scheduler">
                                        <Schedule timetable={this.state.scheduler} enableScheduler={true} type="wizard"
                                                  top_position={(list_links || viewType != 'single') && type != fdm.models.DownloadType.YouTubeVideo} />
                                    </div>

                                    : null}

                            </div>
                        }

                        { youtube_channel_videos && !this.state.enableScheduler ?
                            <div className="quality_wrapper">
                                <label>{__('Video Quality')}: </label>
                                <div className="transparent_select" style={{display: this.state.divVideoQualitySelectOpened ? 'block' : 'none'}}
                                    onClick={this.divVideoQualitySelectClose}></div>
                                <div className="wrapper_inselect" onClick={this.divVideoQualitySelectToggle}>
                                    <span id="VideoQuality">{__(app.controllers.downloadWizard.model.get('VideoQualityForChannel'))}</span>
                                    <div className="dropdown_button"></div>
                                    { this.state.divVideoQualitySelectOpened ?
                                        <div className="list">
                                            {
                                                function(){
                                                    var quality_list = [];

                                                    for (var quality in fdm.models.VideoQualityOptionsToVideoFormat) {
                                                        var quality_item = ( <div key={quality} onClick={_.partial(this.VideoQualityChange, quality)}><span>{__(quality)}</span></div> );
                                                        quality_list.push(quality_item);
                                                    }
                                                    return quality_list;
                                                }.apply(this)
                                            }
                                        </div>
                                    : null }
                                </div>
                            </div>
                        : null}

                        {youtube_channel_videos ? null :
                            <div className="total">

                                {diskFreeSpace !== null && diskFreeSpace > 0 && selectedSizeBytes > 0 ?
                                    <span className={selectedSizeBytes > diskFreeSpace ? 'error_state' : null}>
                                        {'(' + __('Disk space:') + ' ' + fdm.sizeUtils.bytesAsText(diskFreeSpace) + ')'}</span>
                                    : null}

                                {diskFreeSpace !== null && diskFreeSpace <= 0 && selectedSizeBytes > 0 ?
                                    <span className={selectedSizeBytes > diskFreeSpace ? 'error_state' : null}>
                                        {'(' + __('Disk space:') + ' ' + fdm.sizeUtils.bytesAsText(0) + ')'}</span>
                                    : null}

                                &nbsp;

                                {selectedSizeBytes > 0 ?
                                    <span className={diskFreeSpace !== null && selectedSizeBytes > diskFreeSpace ? 'error_state' : null}>
                                        {(type == fdm.models.DownloadType.Trt ? (filesCount > 1 ? __('Selected size:'): __('Size:')) : __('File size:')) + ' '
                                    + fdm.sizeUtils.bytesAsText(selectedSizeBytes) + ' '}</span>
                                    : null}

                            </div>
                        }

                        { this.state.suggestEquivalent > 0 ?
                            <div className="note_info">
                                {__('Found incomplete download with same name and size.')}<br />
                                {__('Would you like to start new or resume downloading?')}
                            </div>
                            : null }

                    </div>

                    {startable && this.state.autostartSupported && !targetFolderDiscIsFull ?
                        <div className="catch_block">
                            <input type="checkbox" id="catch_links"
                                   checked={this.state.catchLinksCheckbox}
                                   defaultChecked={this.state.catchLinksCheckbox}
                                   onChange={this.catchLinksChange}/>
                            <label htmlFor="catch_links">{__('Catch links without confirmation')}</label>
                        </div>
                        : null }

                    <div className="bottom">
                        <span className="error-message">
                            <span>{errorMessage}</span>
                        </span>


                        {errorMessage == '' ?
                            (show_scheduler_message ?
                                <span className="error-message" style={{color: "#585759"}}>
                                            <span>{__('Set days of the week to enable Scheduler')}</span>
                                        </span>
                                : (
                                    type == fdm.models.DownloadType.YouTubeVideo && !show_scheduler_message
                                    && errorMessage == '' && model.get('diskFreeSpace') > 0 && model.get('selectedSizeBytes') > 0
                                    && model.get('selectedSizeBytes') > model.get('diskFreeSpace') ?

                                        <span className="error-message">
                                            <span>{(filesCount > 1 ? __('Selected size:') : __('Size:')) + ' '
                                            + fdm.sizeUtils.bytesAsText(model.get('selectedSizeBytes')) + ' '
                                            + '(' + __('Disk space:') + ' ' + fdm.sizeUtils.bytesAsText(model.get('diskFreeSpace')) + ')'}</span>
                                        </span>

                                        : (
                                            youtube_channel_videos && this.state.youtubeChannelCountVideoChecked > 0 ?
                                                <div className="error-message" style={{color: "#444"}}>
                                                    <span>{__('%n videos are chosen', [this.state.youtubeChannelCountVideoChecked])}</span>
                                                </div>
                                                : null
                                        )
                                ))
                            : null }

                        <div className="group_button">
                            <button className="left_button linkblock" onClick={this.cancelByButton}
                                    onMouseDown={this.buttonMouseDown}>{__('Cancel')}</button>

                            {this.state.suggestEquivalent > 0 ?

                                [
                                    <button className="left_button linkblock" disabled={!startable || !targetFolderIsValid}
                                            onClick={this.createDownload}
                                            onMouseDown={this.buttonMouseDown}>{__('Start new')}</button>,
                                    <button className="right_button linkblock" disabled={!startable || !targetFolderIsValid}
                                            onClick={this.resumeDownload}
                                            onMouseDown={this.buttonMouseDown}>{__('Resume')}</button>
                                ]

                                :

                                (startable && targetFolderDiscIsFull ?
                                    <button className="right_button linkblock btn_anyway"
                                            onClick={this.createDownload}
                                            onMouseDown={this.buttonMouseDown}>{__('Download anyway')}</button>
                                    :
                                    <button className="right_button linkblock" disabled={!startable || !targetFolderIsValid}
                                            onClick={this.createDownload}
                                            onMouseDown={this.buttonMouseDown}>{__('Download')}</button>)
                            }
                        </div>
                    </div>

                </div>

            </div>
        );
    }
});


var WizardFilesTable = React.createClass({

    getInitialState: function() {

        return this.props.treeNode.toJSON();
    },

    componentDidMount: function(){

        this.props.treeNode.on('change', this.onChange, this);
    },

    componentWillUnmount:function(){

        this.props.treeNode.off('change', this.onChange, this);
    },

    onChange: function(){

        this.setState(this.props.treeNode.toJSON());
    },

    toggleChecked: function(e){

        app.controllers.downloadWizard.toggleChecked(this.props.treeNode);
    },

    render: function () {

        var files = this.props.treeNode._children.models;
        var file = this.props.treeNode;
        var root_tree = this.props.root_tree;

        var opened_folders = this.props.opened_folders;
        var selected_files = this.props.selected_files;
        var is_youtube = this.props.is_youtube;
        var is_root = this.props.is_root;

        var only_leafs = true;
        var only_folders = true;
        if (is_root){
            for (var i = 0; i< files.length; i++){
                if (files[i]._children.length > 0)
                    only_leafs = false;
                else
                    only_folders = false;
            }
        }

        var file_data = this.state.data;
        var checked = this.state.checked;
        var file_index = this.state.index;
        var list_links = this.props.listLinks;

        var is_open = opened_folders[file_index] != undefined;
        //var is_selected = selected_files[file_index] != undefined;
        var is_leaf = list_links || file._children.length == 0;

        return (

            <li key={file_index}
                className={rjs_class({
                        closed: !is_open,
                        open: is_open,
                        leaf: is_leaf,
                        no_margin: is_root && !only_leafs && !only_folders && !list_links,
                        batch_download: list_links
                    })}>
                <ins onMouseDown={function(e){root_tree.toggleOpen(file); stopEventBubble(e);}}
                     onDoubleClick={stopEventBubble}></ins>

                <input onChange={this.toggleChecked}
                       defaultChecked={this.state.checked}
                       checked={this.state.checked}
                       type="checkbox"
                       disabled={is_youtube && !is_root}
                       id={'index-' + file.cid}/>

                <label className={rjs_class({
                            caption: true,
                            disabled: is_youtube && !is_root,
                            indeterminate: checked === undefined
                        })} htmlFor={'index-' + file.cid}>

                    {list_links ?
                        <span title={file_data.url} className="file_name">{file_data.url}</span>
                        :
                        <span className="file_name">{file_data.name}</span>
                    }

                    {!list_links ?
                        <span className="file_size">{fdm.sizeUtils.bytesAsText(file_data.size)}</span>
                        :
                        <span className="file_size">&nbsp;</span>
                    }
                </label>

                { !list_links && is_open && file._children && !is_leaf ?

                    <ul>

                        {file._children.map(function(child){

                            return (
                                <WizardFilesTable key={child.id} is_youtube={is_youtube} is_root={false}
                                                  treeNode={child} root_tree={root_tree}
                                                  selected_files={selected_files} opened_folders={opened_folders}/>
                            );
                        })}

                    </ul>

                    : null }

            </li>
        );
    }
});


var YoutubeChannelVideos = React.createClass({

    toggleVideoCheckbox: function(e){      
        var video_key = e.target.id.substring(6);
        var checkState = app.controllers.downloadWizard.model.attributes.youtubeChannelVideos.videos[video_key].checked;
        
        if (checkState === true) {
            app.controllers.downloadWizard.model.attributes.youtubeChannelVideos.videos[video_key].checked = false;
        } else {
            app.controllers.downloadWizard.model.attributes.youtubeChannelVideos.videos[video_key].checked = true;
        }
        app.controllers.downloadWizard.model.trigger('change:youtubeChannelVideos');
        
        this.forceUpdate();
    },   
    
    showVideoImageTooltip: function(e){ 
        var div_id = $(e.target.nextSibling).attr('id');
        var pos = $(e.target).offset();
        var imgtop = pos.top - 120;
        $('#'+div_id).attr("style", "display: block; top: "+imgtop+"px");
         
        if ($('#'+div_id+' img').attr('class') === 'image_downloading') {
            var key = div_id.substring(7);
            var img_src = app.controllers.downloadWizard.model.attributes.youtubeChannelVideos.videos[key].img_url;
            var video_img = new Image();
            video_img.src = img_src;
            video_img.className = 'image-downloaded';
            video_img.onload = function(){
                $('#'+div_id + ' .image_downloading_wr').empty();
                $('#'+div_id + ' .image_downloading_wr').append(video_img);
            }
        }
    },
    
    hideVideoImageTooltip: function(e){ 
        var div_id = $(e.target.nextSibling).attr('id');
        $('#'+div_id).hide();
    },

    render: function () {

        var videos = [];

        for (var i in this.props.videosObj.videos) {

            var video = this.props.videosObj.videos[i];

            var checked = true;

            var video_dom = (

                <li key={i}
                    className={rjs_class({
                        leaf: true,
                        no_margin: false,
                        batch_download: true
                    })}>

                    <ins></ins>
                    <input  onChange={this.toggleVideoCheckbox}
                           defaultChecked={video.checked}
                           checked={video.checked}
                           type="checkbox"
                           id={'index-' + i}/>

                    <label className={rjs_class({
                        caption: true,
                        indeterminate: checked === undefined
                    })} htmlFor={'index-' + i}>

                        <span title={video.title} className="file_name" onMouseOver={this.showVideoImageTooltip}
                            onMouseOut={this.hideVideoImageTooltip} id={'spantitle-' + i}>{video.title}
                            <div id={'divimg-' + i} className="tooltip">
                                <div className="image_downloading_wr">
                                    <img src="loading_light_bg.gif" className="image_downloading" />
                                </div>
                            </div>
                        </span>

                        {video.duration ?
                            <span className="file_size">[{video.duration}]</span>
                            :
                            <span className="file_size">&nbsp;</span>
                        }

                        {video.upload_time ?
                            <span className="file_date">{video.upload_time}</span>
                            : null}

                    </label>

                </li>
            );

            videos.push(video_dom);
        }


        return (                
            <ul>
                {videos}
            </ul>
        );
    }
});
