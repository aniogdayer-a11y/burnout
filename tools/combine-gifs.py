"""Combine the Windows-rendered GIF frames using only Python's standard library."""
from pathlib import Path
import struct

root = Path(__file__).resolve().parent.parent
for name in ('cloud', 'plant', 'tea', 'heart', 'sunrise', 'moon', 'butterfly', 'balloon', 'celebrate'):
    output = bytearray(b'GIF89a' + struct.pack('<HHBBB', 320, 240, 0x70, 0, 0))
    output += b'\x21\xff\x0bNETSCAPE2.0\x03\x01\x00\x00\x00'
    for i in range(18):
        data = (root / '.build-tools' / 'frames' / f'{name}-{i}.gif').read_bytes()
        packed = data[10]
        palette_size = 3 * (2 ** ((packed & 7) + 1)) if packed & 128 else 0
        palette = data[13:13 + palette_size]
        cursor = 13 + palette_size
        while data[cursor] == 0x21:
            cursor += 2
            while data[cursor]:
                cursor += data[cursor] + 1
            cursor += 1
        assert data[cursor] == 0x2C
        descriptor = bytearray(data[cursor:cursor + 10])
        cursor += 10
        if descriptor[9] & 128:
            size = 3 * (2 ** ((descriptor[9] & 7) + 1))
            palette = data[cursor:cursor + size]
            cursor += size
        else:
            descriptor[9] = (descriptor[9] & 0x40) | 128 | (packed & 7)
        start = cursor
        cursor += 1
        while data[cursor]:
            cursor += data[cursor] + 1
        cursor += 1
        output += b'\x21\xf9\x04\x04\x0b\x00\x00\x00'
        output += descriptor + palette + data[start:cursor]
    output += b'\x3b'
    target = root / 'assets' / f'{name}.gif'
    target.write_bytes(output)
    print(f'{target.name}: {len(output):,} bytes, 18 frames')
