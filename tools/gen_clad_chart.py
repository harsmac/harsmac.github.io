"""Rebuild the CLAD Background-Challenge scatter as vector SVG.
Numbers are lifted verbatim from Table 1 of the paper source (main.tex),
not estimated off the old bitmap."""

# (label, Mixed-Same, Mixed-Rand, group, label_dx, label_dy, anchor)
POINTS = [
    ("Base (IN)",       82.3, 76.3, "base",  10,   4, "start"),
    ("Base (IN9)",      87.5, 73.4, "base",  10,   4, "start"),
    ("Base (MR)",       87.1, 86.7, "base", -10,   4, "end"),
    ("CIM",             89.8, 81.1, "other", 10,  -2, "start"),
    ("SCL_E2E",         90.7, 80.1, "other", 10,   9, "start"),
    ("CIM+VIB",         90.2, 82.2, "other", 10,  -8, "start"),
    ("SupCon+ShapeAug", 79.2, 72.3, "other",  0, -14, "middle"),
    ("MoCo-v2",         89.6, 85.2, "other", -2, -13, "middle"),
    ("BYOL",            90.2, 85.2, "other", 11,  12, "start"),
    ("SwAV",            87.0, 77.1, "other", 10,   4, "start"),
    ("AttMask-High",    76.2, 62.3, "other", 10,   4, "start"),
    ("MoCov2+GT",       84.5, 72.0, "other", 10,   4, "start"),
    ("BYOL+GT",         84.9, 70.5, "other", 10,   4, "start"),
    ("DILEMMA",         79.4, 67.6, "other", 10,   4, "start"),
    ("CLAD+",           90.5, 89.3, "ours",  12,   4, "start"),
    ("CLAD",            90.1, 87.5, "ours",  12,   4, "start"),
]

LO, HI = 60, 93
W, H = 780, 600
L, R, T, B = 74, 116, 18, 62          # margins
PW, PH = W - L - R, H - T - B

sx = lambda v: L + (v - LO) / (HI - LO) * PW
sy = lambda v: T + (HI - v) / (HI - LO) * PH

def star(cx, cy, r=8.5):
    import math
    pts = []
    for i in range(10):
        a = -math.pi / 2 + i * math.pi / 5
        rr = r if i % 2 == 0 else r * 0.42
        pts.append(f"{cx + rr*math.cos(a):.2f},{cy + rr*math.sin(a):.2f}")
    return f'<polygon points="{" ".join(pts)}"/>'

o = []
o.append(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" '
         f'role="img" aria-label="Model accuracy on Mixed-Same versus Mixed-Rand. '
         f'CLAD and CLAD+ sit closest to the identity line, meaning the least background bias." '
         f'class="chart">')
o.append('''<style>
.chart{font-family:var(--font-body,system-ui,sans-serif)}
.chart .plot-bg{fill:var(--chart-plot,#eef0f6)}
.chart .grid{stroke:var(--chart-grid,#fff);stroke-width:1.2}
.chart .ident{stroke:var(--ink,#17171c);stroke-width:2;stroke-dasharray:9 7;fill:none;opacity:.65}
.chart .tick{fill:var(--ink-muted,#4f5060);font-size:16px}
.chart .axis{fill:var(--ink,#17171c);font-size:19px;font-weight:600}
.chart .lbl{font-size:14px;font-weight:500}
.chart .g-other{fill:var(--chart-other,#2f7d32)}
.chart .g-base{fill:var(--chart-base,#2438c4)}
.chart .g-ours{fill:var(--chart-ours,#d92b2b)}
.chart .note{fill:var(--ink-subtle,#737485);font-size:14px;font-style:italic}
</style>''')

o.append(f'<rect class="plot-bg" x="{L}" y="{T}" width="{PW}" height="{PH}" rx="4"/>')
for v in range(60, 96, 5):
    if LO < v < HI:
        o.append(f'<line class="grid" x1="{sx(v):.1f}" y1="{T}" x2="{sx(v):.1f}" y2="{T+PH}"/>')
        o.append(f'<line class="grid" x1="{L}" y1="{sy(v):.1f}" x2="{L+PW}" y2="{sy(v):.1f}"/>')
        o.append(f'<text class="tick" x="{sx(v):.1f}" y="{T+PH+26}" text-anchor="middle">{v}</text>')
        o.append(f'<text class="tick" x="{L-12}" y="{sy(v)+6:.1f}" text-anchor="end">{v}</text>')

o.append(f'<line class="ident" x1="{sx(LO):.1f}" y1="{sy(LO):.1f}" x2="{sx(HI):.1f}" y2="{sy(HI):.1f}"/>')
o.append(f'<text class="note" x="{sx(63):.1f}" y="{sy(65.6):.1f}" transform="rotate(-45 {sx(63):.1f} {sy(65.6):.1f})">no background bias</text>')

for name, x, y, grp, dx, dy, anchor in POINTS:
    cx, cy = sx(x), sy(y)
    g = f'g-{grp}'
    if grp == "ours":
        o.append(f'<g class="{g}">{star(cx, cy)}</g>')
    elif grp == "base":
        o.append(f'<polygon class="{g}" points="{cx:.1f},{cy-8:.1f} {cx+7.5:.1f},{cy+5.5:.1f} {cx-7.5:.1f},{cy+5.5:.1f}"/>')
    else:
        o.append(f'<circle class="{g}" cx="{cx:.1f}" cy="{cy:.1f}" r="6.5"/>')
    o.append(f'<text class="lbl {g}" x="{cx+dx:.1f}" y="{cy+dy:.1f}" text-anchor="{anchor}">{name.replace("_","_")}</text>')

o.append(f'<text class="axis" x="{L+PW/2:.0f}" y="{H-16}" text-anchor="middle">Mixed-Same accuracy (%)</text>')
o.append(f'<text class="axis" x="22" y="{T+PH/2:.0f}" text-anchor="middle" transform="rotate(-90 22 {T+PH/2:.0f})">Mixed-Rand accuracy (%)</text>')
o.append('</svg>')

open('/tmp/plot/clad_results.svg','w').write('\n'.join(o))
print('wrote clad_results.svg', len('\n'.join(o)), 'bytes')
