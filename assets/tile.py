#!/usr/bin/env python3
"""
make_seamless_tile.py

Usage:
  python make_seamless_tile.py input.svg output.svg

Creates a new SVG that concatenates:
  [ original | horizontally flipped original ]
Result width = 2 * original width, height unchanged.
No <use> indirection; everything is inlined for max compatibility.
"""
import sys, re, copy
import xml.etree.ElementTree as ET

SVG_NS = "http://www.w3.org/2000/svg"
ET.register_namespace("", SVG_NS)

def fnum(s):
    if s is None: return None
    m = re.match(r"^\s*([0-9]+(?:\.[0-9]+)?)", str(s))
    return float(m.group(1)) if m else None

def get_dims(root):
    w = fnum(root.get("width"))
    h = fnum(root.get("height"))
    vb = root.get("viewBox")
    viewBox = None
    if vb:
        parts = [float(x) for x in re.split(r"[,\s]+", vb.strip()) if x]
        if len(parts) == 4:
            viewBox = parts  # [minx,miny,w,h]
            if w is None: w = viewBox[2]
            if h is None: h = viewBox[3]
    if w is None or h is None:
        raise ValueError("Could not determine width/height (need width/height or viewBox).")
    return w, h, viewBox

def collect_defs(root):
    defs_out = ET.Element(f"{{{SVG_NS}}}defs")
    for child in list(root):
        if child.tag == f"{{{SVG_NS}}}defs":
            for d in list(child):
                defs_out.append(copy.deepcopy(d))
    return defs_out if list(defs_out) else None

def deep_copy_children(src_parent, dst_parent, strip_ids=False):
    for child in list(src_parent):
        if child.tag == f"{{{SVG_NS}}}defs":
            continue  # handled separately
        new_child = copy.deepcopy(child)
        if strip_ids and "id" in new_child.attrib:
            del new_child.attrib["id"]
        dst_parent.append(new_child)

def main():
    if len(sys.argv) != 3:
        print("Usage: python make_seamless_tile.py input.svg output.svg")
        sys.exit(1)

    inp, outp = sys.argv[1], sys.argv[2]
    src_tree = ET.parse(inp)
    src_root = src_tree.getroot()
    W, H, vb = get_dims(src_root)

    # Build output root
    out_attrib = {
        "xmlns": SVG_NS,
        "width": str(W * 2),
        "height": str(H),
        "version": "1.1"
    }
    if vb:
        out_attrib["viewBox"] = f"{vb[0]} {vb[1]} {vb[2]*2} {vb[3]}"
    else:
        out_attrib["viewBox"] = f"0 0 {W*2} {H}"

    out_root = ET.Element(f"{{{SVG_NS}}}svg", out_attrib)

    # Copy <defs> (gradients, clipPaths, etc.) once
    defs = collect_defs(src_root)
    if defs is not None:
        out_root.append(defs)

    # Left half: exact copy of visible children
    left_group = ET.SubElement(out_root, f"{{{SVG_NS}}}g", {"id": "tile_left"})
    deep_copy_children(src_root, left_group)

    # Right half: deep copy again, flipped and translated
    right_group = ET.SubElement(
        out_root,
        f"{{{SVG_NS}}}g",
        {"id": "tile_right", "transform": f"translate({2*W},0) scale(-1,1)"}
    )
    deep_copy_children(src_root, right_group, strip_ids=True)

    ET.ElementTree(out_root).write(outp, encoding="utf-8", xml_declaration=True)
    print(f"Saved: {outp}")

if __name__ == "__main__":
    main()
