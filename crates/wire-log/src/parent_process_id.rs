#[cfg(unix)]
pub fn parent_process_id() -> Option<u32> {
    Some(std::os::unix::process::parent_id())
}

/// Windows keeps no parent pointer on the process itself; the Toolhelp snapshot lists it per process. The snapshot
/// handle is checked before use and closed once, and `entry` has its size field set as Process32FirstW requires.
#[cfg(windows)]
#[allow(unsafe_code)]
pub fn parent_process_id() -> Option<u32> {
    use windows_sys::Win32::Foundation::{CloseHandle, INVALID_HANDLE_VALUE};
    use windows_sys::Win32::System::Diagnostics::ToolHelp::{
        CreateToolhelp32Snapshot, PROCESSENTRY32W, Process32FirstW, Process32NextW, TH32CS_SNAPPROCESS,
    };

    let pid = std::process::id();
    unsafe {
        let snapshot = CreateToolhelp32Snapshot(TH32CS_SNAPPROCESS, 0);
        if snapshot == INVALID_HANDLE_VALUE {
            return None;
        }
        let mut entry: PROCESSENTRY32W = std::mem::zeroed();
        entry.dwSize = std::mem::size_of::<PROCESSENTRY32W>() as u32;
        let mut parent = None;
        let mut found = Process32FirstW(snapshot, &mut entry) != 0;
        while found {
            if entry.th32ProcessID == pid {
                parent = Some(entry.th32ParentProcessID);
                break;
            }
            found = Process32NextW(snapshot, &mut entry) != 0;
        }
        CloseHandle(snapshot);
        parent
    }
}
