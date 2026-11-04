/// Where a field sits in a 512-byte ustar header.
#[derive(Clone, Copy, Debug)]
pub struct TarField {
    pub offset: usize,
    pub length: usize,
}
