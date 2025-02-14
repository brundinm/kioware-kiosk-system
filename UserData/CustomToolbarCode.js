// MRB: Mon 24-Jun-2019
// Invoked this JavaScript file and modified and added to the script
// extensively.  [Note: didn't bother with changing the indentation style to
// what I would prefer, which would be the following: four spaces (not a
// hard tab and random spaces), the Java minor variant of the K&R style
// (opening brace is on the same line for class and method declarations),
// and mandatory braces for control statements.]

/*
**
* MRB
*
* Two important features that were added were user session logging to the
* Windows Event Viewer, and the ability for users to rename downloaded PDF
* journal article files. 
*
* The Event Viewer now contains string entries beginning with "Begin user
* session" and "End user session", and both strings have accompanying ISO
* 8601 formatted timestamps and session IDs.  Two other useful strings that
* can be used to more rigorously identify user sessions by removing "false"
* begin and/or end user session entries are "KioWare is Starting" and "Exit
* complete".  Note: every "Begin user session" entry should have a
* corresponding "End user session" entry with the same session ID value.
*
* Users can now also rename downloaded PDF journal articles before they are
* moved to the root of the user's USB flash drive.  Users are warned if there
* is no USB flash drive found in the USB port, and they are also warned if
* the download PDF file to be moved will overwrite an existing file with the
* same name on their USB flash drive.
*/

/*
This file can be used to run custom code in every KioWare toolbar.  It is convenient if you need to run code, but do not need to modify the toolbar in any huge way: This avoids the need to copy the entire toolbar code-set to UserData.
The example below first checks to make sure that the toolbar events api is what you expect.  The toolbarEventsVer will change if we make a breaking change to any of the supported callbacks in toolbar.js.  Do a search for toolbarEventsVer in toolbar.js to see what those events are (four are below).

The toolbarVer variable will change if a potential breaking change is made to the toolbar (other than events).  This is useful in case you are modifying elements on the toolbar from here.

Uncomment the code below to make sure it's working.  From any toolbar named Default or Main Toolbar, and is on the main KioWare window, it will make the background color of the current page grey when the page completely finishes loading.  It will also create a session_count file in C:\ProgramData\KioWare Client\CustomToolbarCodeExample\ that counts the total number user sessions run.
*/

// MRB: Mon 03-Jun-2019: uncommented code below
var _sessId;

if(toolbarEventsVer==1)
{
if((toolbar.name=="Default Toolbar" || toolbar.name=="Main Toolbar") && KioInfo.WindowType==1)
{
	var _onSessionBegin = OnSessionBegin, _onSessionEnd = OnSessionEnd, _onLoadStart = OnLoadStart, _onLoadEnd = OnLoadEnd, _onLoadError = window.OnLoadError, _onTabChanged = OnTabChanged, _onSelectedNodeChanged = OnSelectedNodeChanged, _onFileDownloadComplete = OnFileDownloadComplete, _onBrowsingAclBlock = OnBrowsingAclBlock, _onScriptingAclBlock = OnScriptingAclBlock, _onProtocolAclBlock = OnProtocolAclBlock;
	//var _sessCount = -1, _lastSessIdLogged, _sessCountPath = KioApp.GetDataDir()+"CustomToolbarCodeExample/"+KioInfo.SystemSessionId+"/session_count.txt";

	window.OnSessionBegin = function(sessId)
	{
        _onSessionBegin(sessId);
        _sessId = sessId;
        // MRB: Mon 24-Jun-2019: added lines below
        var dateBegin = new Date();
        var dateBeginFormatted = dateBegin.toISOString();
        // declare global variable sessIdEnd for session ID with value from
        // private variable _sessId so that OnSessionEnd function can
        // access the session ID value
        sessIdEnd = _sessId;
        // write out begin user session string to the Windows Event Viewer;
        // contains ISO 8601 formatted date (i.e.,
        // YYYY-MM-DDThh:mm:ss.sssZ) and the session ID value
        KioApp.LogDiag("Begin user session\t" + dateBeginFormatted + "\t" + _sessId);
        // MRB: Mon 24-Jun-2019: commented out lines below; note, the
        // "return" statement below was causing the OnSessionBegin function
        // not to be called or invoked, i.e., as expected, it would exit
        // the function at the return statement; ALSO, to get
        // OnSessionBegin to work, in KioWare Config Tool needed to go to
        // User Interface -> Main Toolbar edit -> and in Visiblity pane
        // need to deselect "Clear Browser when Hidden" checkbox
        
		// return;
        
        //if(_sessCount==-1)
		//{
		//	try{_sessCount = parseInt(KioFileIO.ReadFileText(_sessCountPath));}
		//	catch(ex)
		//	{
		//		_sessCount = 0;
		//		try{KioFileIO.CreateFile(_sessCountPath, true);}
		//		catch(ex){}
		//	}
		//}
		//++_sessCount;
		//KioApp.LogDiag("User Session Begin: "+sessId+", Count: "+_sessCount);
		//try{KioFileIO.WriteFileText(_sessCountPath, _sessCount.toString(), false);}
		//catch(ex){KioApp.LogWarn(ex.message);}
	}
	window.OnSessionEnd = function()
	{
		_onSessionEnd();
        _sessId = null;
        // MRB: Mon 24-Jun-2019: added lines below
        var dateEnd = new Date();
        var dateEndFormatted = dateEnd.toISOString();
        // MRB: Mon 24-Jun-2019: uncommented and revised line below
        // write out end user session string to the Windows Event Viewer;
        // contains ISO 8601 formatted date (i.e.,
        // YYYY-MM-DDThh:mm:ss.sssZ) and the session ID value
		KioApp.LogDiag("End user session\t" + dateEndFormatted + "\t" + sessIdEnd);
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
	
    // MRB: Mon 03-Jun-2019
    // added new OnFileDownloadComplete function; function calls new
    // MoveDownloadFile function which allows user to provide new filename
    // to downloaded PDF file if they want, then the file is moved from
    // %USERPROFILE%\AppData\Local\KioWare_Client_Platform\SystemSessions
    // \1\SessionTempData\Downloads\ to the root of the removable drive
    // (the root of the user's USB flash drive)
	/*
		window.OnFileDownloadComplete = function(url, filePath, actionPerformed)
		{
			_onFileDownloadComplete(url, filePath, actionPerformed);
		}
	*/
	//---------------- OnFileDownloadComplete CODE BEGIN ----------------
	window.OnFileDownloadComplete = function(url, filePath, actionPerformed)
	{
        _onFileDownloadComplete(url, filePath, actionPerformed);
        console.log("OnFileDownloadComplete: "+filePath);
        MoveDownloadFile(filePath);
	}
	window.MoveDownloadFile = function(filePath)
	{
	 var promptForRename = true;
	 var remDrives = KioFileIO.GetAllDrives2(2);

	 if(!remDrives.length)
	 {
	  if(confirm("Please insert a USB flash drive to continue."))
		return MoveDownloadFile(filePath);
		return;
	 }
	 var ind = filePath.lastIndexOf("\\")+1;
	 var fn = filePath.substr(ind);
	 var newPath = filePath.substr(0, ind);

	 if(promptForRename)
	  fn = prompt("Please specify a file name.", fn);

	 if(!fn)
	 return;
	 if(fn.indexOf("\\") != -1 || fn.indexOf("/") != -1)
	 {
	   alert("Invalid file name.");
	   return;
	 }
	 newPath = remDrives[0].path+"\\"+fn;
	 var fd = JSON.parse(KioFileIO.GetFileDetails(newPath));

	 if(fd.Exists)
	 {
	   if(!confirm("The file already exists.  Would you like to overwrite the file?"))
		return MoveDownloadFile(filePath);

		try{KioFileIO.DeleteFile(newPath);}
		catch(ex) {alert("Could not delete destination file."); return;}
	 }
	 try{KioFileIO.MoveFile(filePath, newPath);}
	 catch(ex) {alert("Could not move\n"+filePath+"\nto\n"+newPath); return;}

	 alert("Success!  The file has been downloaded to the USB flash drive.");
	}
	//---------------- OnFileDownloadComplete CODE END ----------------
    
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

// MRB: Mon 24-Jun-2019: commented out code below
/*
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
*/
//else KioApp.LogWarn("CustomToolbarCode.js will not work because toolbarVer has changed.");

//This variable must exist, and be set to 1 if you are using this file:
var customToolbarCodeInUse = 1;
