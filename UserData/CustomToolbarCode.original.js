/*
This file can be used to run custom code in every KioWare toolbar.  It is convenient if you need to run code, but do not need to modify the toolbar in any huge way: This avoids the need to copy the entire toolbar code-set to UserData.
The example below first checks to make sure that the toolbar events api is what you expect.  The toolbarEventsVer will change if we make a breaking change to any of the supported callbacks in toolbar.js.  Do a search for toolbarEventsVer in toolbar.js to see what those events are (four are below).

The toolbarVer variable will change if a potential breaking change is made to the toolbar (other than events).  This is useful in case you are modifying elements on the toolbar from here.

Uncomment the code below to make sure it's working.  From any toolbar named Default or Main Toolbar, and is on the main KioWare window, it will make the background color of the current page grey when the page completely finishes loading.  It will also create a session_count file in C:\ProgramData\KioWare Client\CustomToolbarCodeExample\ that counts the total number user sessions run.
*/

/*
var _sessId;

if(toolbarEventsVer==1)
{
if((toolbar.name=="Default Toolbar" || toolbar.name=="Main Toolbar") && KioInfo.WindowType==1)
{
	var _onSessionBegin = OnSessionBegin, _onSessionEnd = OnSessionEnd, _onLoadStart = OnLoadStart, _onLoadEnd = OnLoadEnd, _onLoadError = window.OnLoadError, _onTabChanged = OnTabChanged, _onSelectedNodeChanged = OnSelectedNodeChanged, _onFileDownloadComplete = OnFileDownloadComplete, _onBrowsingAclBlock = OnBrowsingAclBlock, _onScriptingAclBlock = OnScriptingAclBlock, _onProtocolAclBlock = OnProtocolAclBlock;
	var _sessCount = -1, _lastSessIdLogged, _sessCountPath = KioApp.GetDataDir()+"CustomToolbarCodeExample/"+KioInfo.SystemSessionId+"/session_count.txt";

	window.OnSessionBegin = function(sessId)
	{
		_onSessionBegin(sessId);
		_sessId = sessId;
		return;

		if(_sessCount==-1)
		{
			try{_sessCount = parseInt(KioFileIO.ReadFileText(_sessCountPath));}
			catch(ex)
			{
				_sessCount = 0;
				try{KioFileIO.CreateFile(_sessCountPath, true);}
				catch(ex){}
			}
		}
		++_sessCount;
		KioApp.LogDiag("User Session Begin: "+sessId+", Count: "+_sessCount);
		try{KioFileIO.WriteFileText(_sessCountPath, _sessCount.toString(), false);}
		catch(ex){KioApp.LogWarn(ex.message);}
	}
	window.OnSessionEnd = function()
	{
		_onSessionEnd();
		_sessId = null;
		//KioApp.LogDiag("User Session End");
	}

	window.OnLoadStart = function(url)
	{
		_onLoadStart(url);
		//KioApp.LogDiag("Loading: "+url);
		KioBrowser.Find(null);
	}
	window.OnLoadEnd = function(url)
	{
		_onLoadEnd(url);
		//KioBrowser.InjectJavaScript('if(document.body) document.body.style.backgroundColor = "grey"'); //See bug 4372
	}
	window.OnLoadError = function(url, errCode) //Note that -3 is aborted, which isn't really an error, but you need to know that the page is finished loading
	{
		if(_onLoadError) _onLoadError(url);
		//KioApp.LogDiag("Load Error "+errCode+": "+url);
	}
	window.OnTabChanged = function(tabIndex, url, isLoading, canGoBack, canGoForward)
	{
		_onTabChanged(tabIndex, url, isLoading, canGoBack, canGoForward);
	}
	window.OnSelectedNodeChanged = function(browserType, isMainFrame, frameUid, url, tagName, id, name, type, flags, nodeUid)
	{
		_onSelectedNodeChanged(browserType, isMainFrame, frameUid, url, tagName, id, name, type, flags, nodeUid);
		//KioApp.LogDiag("OnSelectedNodeChanged - isMainFrame:"+isMainFrame+" frameUid:"+frameUid+" tagName:"+tagName+" id:"+id+" name:"+name+" type:"+type+" flags:"+flags+" nodeUid:"+nodeUid+" url:"+url);
	}
	window.OnFileDownloadComplete = function(url, filePath, actionPerformed)
	{
		_onFileDownloadComplete(url, filePath, actionPerformed);
	}
	window.OnBrowsingAclBlock = function(url, isActiveTab)
	{
		_onBrowsingAclBlock(url);
	}
	window.OnScriptingAclBlock = function(url, isActiveTab)
	{
		_onScriptingAclBlock(url);
	}
	window.OnProtocolAclBlock = function(url, isActiveTab)
	{
		_onProtocolAclBlock(url);
	}
}
}
else
	KioApp.LogWarn("CustomToolbarCode.js will not work because toolbarEventsVer has changed.  Upgrade your callback overrides and then update the version number check.");

if(toolbarVer==1)
{
	//This will show the current date/time on the first text label on the toolbar with text: [DateTime]
	var dateTimeEl = null;

	setInterval(function()
	{
		if(dateTimeEl==null)
		{
			var labelArr = document.querySelectorAll("[ng-if='control.type==4']");
			
			for(var i = 0; i < labelArr.length; ++i)
			{
				var l = labelArr[i];

				if(l.firstElementChild.firstElementChild && l.firstElementChild.firstElementChild.innerHTML=="[DateTime]")
				{
					dateTimeEl = l.firstElementChild.firstElementChild;
					break;
				}
			}
			if(!dateTimeEl) dateTimeEl = 0;
		}
		if(dateTimeEl) dateTimeEl.innerHTML = (new Date()).toLocaleString();
	}
	, 1000);

	var labelArr = document.querySelectorAll("[ng-if='control.type==4']");

	for(var i = 0; i < labelArr.length; ++i)
	{
		var l = labelArr[i], firstCh = l.firstElementChild;

		if(firstCh.firstElementChild && firstCh.firstElementChild.innerHTML=="[Search]")
		{
			l.removeChild(firstCh);
			var inp = document.createElement("input");
			inp.placeholder = "Search";
			inp.style.width = "80px";
			l.appendChild(inp);
			inp.onkeydown = function(ev)
			{
				if(ev.keyCode==13) KioBrowser.Find(inp.value);
				else if(ev.keyCode==27) {KioBrowser.Find(null); KioBrowser.Focus();}
			}
			break;
		}
	}
}
//else KioApp.LogWarn("CustomToolbarCode.js will not work because toolbarVer has changed.");

//This variable must exist, and be set to 1 if you are using this file:
var customToolbarCodeInUse = 1;
*/