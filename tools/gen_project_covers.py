"""One cover system for all seven project cards.

The site's three-layer wave field IS the composition here, not a decorative
strip - same far/mid/near idea, so a card looks like a window onto the page
background. On top sits one bold motif per project plus a keyword, because the
card title gives the project's NAME (MUFIA, EREN) but not what it does.
Vector: sharp at any size, and it follows the light/dark theme.
"""
import math, pathlib

W, H = 640, 400

STYLE = '''<style>
.cover .bg{fill:url(#cg)}
.cover .w1{fill:var(--cover-ink,#5f6ee8);opacity:.10}
.cover .w2{fill:var(--cover-ink,#5f6ee8);opacity:.14}
.cover .w3{fill:var(--cover-ink,#5f6ee8);opacity:.20}
.cover .ln{fill:none;stroke:var(--cover-ink,#4554cc);stroke-width:5;stroke-linecap:round;stroke-linejoin:round}
.cover .ln-s{fill:none;stroke:var(--cover-soft,#8b97e8);stroke-width:4;stroke-linecap:round;stroke-linejoin:round}
.cover .fl{fill:var(--cover-ink,#4554cc)}
.cover .fl-s{fill:var(--cover-soft,#8b97e8)}
.cover .ac{fill:var(--cover-accent,#c75e3e)}
.cover .ac-ln{fill:none;stroke:var(--cover-accent,#c75e3e);stroke-width:5;stroke-linecap:round;stroke-linejoin:round}
.cover .dash{stroke-dasharray:9 9}
.cover .kw{fill:var(--cover-ink,#4554cc);font-family:var(--font-body,system-ui,sans-serif);
  font-size:23px;font-weight:600;letter-spacing:.13em;opacity:.72}
</style>'''

DEFS = '''<defs><linearGradient id="cg" x1="0" y1="0" x2=".5" y2="1">
<stop offset="0%" stop-color="var(--cover-bg1,#eff1ff)"/>
<stop offset="100%" stop-color="var(--cover-bg2,#dfe4fa)"/>
</linearGradient>
<clipPath id="cp"><rect width="640" height="400"/></clipPath></defs>'''


def wave(base, amp, phase, cls):
    """One seamless swell across the card, same maths as the site background."""
    pts = []
    for i in range(0, 66):
        x = i * 10
        y = base + amp * math.sin(2 * math.pi * x / 640 + phase) + amp * .45 * math.sin(4 * math.pi * x / 640 + phase * 1.7)
        pts.append(f'{x},{y:.1f}')
    return f'<path class="{cls}" d="M{" L".join(pts)} L640,400 L0,400 Z"/>'


BG = (f'<rect class="bg" width="{W}" height="{H}"/>'
      + wave(236, 20, 0.4, 'w1') + wave(292, 26, 2.6, 'w2') + wave(340, 20, 5.0, 'w3'))


def cover(motif, keyword):
    return ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 400" class="cover" '
            'preserveAspectRatio="xMidYMid slice" aria-hidden="true">'
            + STYLE + DEFS + '<g clip-path="url(#cp)">' + BG + motif
            + f'<text class="kw" x="40" y="62">{keyword}</text></g></svg>')


# MUFIA - a spectrum: energy piled into low frequencies, the attacked band in accent
def mufia():
    o = []
    for i in range(14):
        x, h = 132 + i * 28, 132 * math.exp(-i / 4.6) + 12
        cls = 'ac' if i in (4, 5, 6) else ('fl' if i < 4 else 'fl-s')
        o.append(f'<rect class="{cls}" x="{x}" y="{262-h:.0f}" width="15" height="{h:.0f}" rx="7.5"/>')
    return ''.join(o) + '<path class="ln dash" d="M120,262 H532"/>'


# Little Fog - a road running to a vanishing point, dissolving as fog thickens
def fog():
    o = ['<path class="ln" d="M96,330 L306,150"/>', '<path class="ln" d="M560,330 L346,150"/>',
         '<path class="ac-ln dash" d="M326,330 L326,158"/>']
    # soft banks of fog drifting across, so the upper half reads as weather
    for cx, cy, rx, ry, op in [(180, 176, 190, 34, .55), (430, 150, 205, 30, .5),
                               (330, 210, 240, 36, .42), (540, 196, 150, 26, .38)]:
        o.append(f'<ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}" '
                 f'fill="var(--cover-bg1,#eff1ff)" opacity="{op}"/>')
    # denser the further away, so the road fades out rather than stops
    for i in range(9):
        y = 148 + i * 17
        op = 0.93 - i * 0.105
        o.append(f'<rect x="0" y="{y}" width="640" height="19" rx="9.5" '
                 f'fill="var(--cover-bg1,#eff1ff)" opacity="{op:.2f}"/>')
    return ''.join(o)


# CLAD - same object, cluttered background on one side, stripped on the other
def clad():
    o = ['<defs><clipPath id="lh"><rect x="0" y="0" width="320" height="400"/></clipPath></defs>',
         '<g clip-path="url(#lh)">']
    for i in range(9):
        o.append(f'<path class="ln-s" d="M92,{124 + i*23} H548" opacity=".55"/>')
    o.append('</g>')
    # the object itself is identical on both sides - only its surroundings change
    o.append('<circle class="ln" cx="320" cy="208" r="74" fill="var(--cover-bg1,#eff1ff)"/>')
    o.append('<path class="ln" d="M288,226 L312,192 L330,216 L346,200 L358,226 Z" '
             'fill="var(--cover-soft,#8b97e8)"/>')
    o.append('<circle class="fl" cx="300" cy="184" r="9"/>')
    o.append('<path class="ac-ln dash" d="M320,96 V320"/>')
    return ''.join(o)


# LAT - the network's layers; the attack lands inside, not at the input
def lat():
    o = []
    for i in range(5):
        x = 136 + i * 92
        h = [112, 150, 178, 150, 112][i]
        cls = 'ln' if i == 2 else 'ln-s'
        o.append(f'<rect class="{cls}" x="{x}" y="{208-h/2:.0f}" width="42" height="{h}" rx="20" '
                 f'fill="var(--cover-bg1,#eff1ff)"/>')
    o.append('<circle class="ac" cx="349" cy="208" r="17"/>')
    for a in range(8):
        ang = a * math.pi / 4
        o.append(f'<path class="ac-ln" d="M{349+26*math.cos(ang):.0f},{208+26*math.sin(ang):.0f} '
                 f'L{349+40*math.cos(ang):.0f},{208+40*math.sin(ang):.0f}"/>')
    return ''.join(o)


# EREN - corrupted signal in, front-end, clean signal out
def eren():
    noisy = ' '.join(f'{88 + i*7.2},{208 + (26*math.sin(i/1.05) + 15*math.sin(i*2.4))*0.6:.0f}' for i in range(25))
    clean = ' '.join(f'{406 + i*6.4},{208 + 24*math.sin(i/3.1):.0f}' for i in range(22))
    return (f'<polyline class="ln-s" points="{noisy}"/>'
            f'<rect class="ln" x="280" y="128" width="100" height="160" rx="22" fill="var(--cover-bg1,#eff1ff)"/>'
            f'<path class="ac-ln" d="M330,164 V252"/>'
            f'<polyline class="ln" points="{clean}"/>')


# Adversarial subspace - many directions collapsing onto a few that matter
def subspace():
    o = ['<path class="ln" d="M128,264 L318,198 L522,244 L332,314 Z" fill="var(--cover-bg1,#eff1ff)"/>']
    for x0, y0, x1, y1 in [(196, 122, 256, 244), (318, 100, 344, 226), (452, 132, 434, 240)]:
        o.append(f'<path class="ln-s dash" d="M{x0},{y0} L{x1},{y1}"/>')
        o.append(f'<circle class="fl-s" cx="{x0}" cy="{y0}" r="11"/>')
        o.append(f'<circle class="ac" cx="{x1}" cy="{y1}" r="11"/>')
    return ''.join(o)


# Fairness vs robustness - one goes up only as the other comes down
def fairness():
    return ('<path class="ln" d="M140,120 V296 H520"/>'
            '<path class="ln-s" d="M172,272 C262,250 330,196 496,156"/>'
            '<path class="ac-ln" d="M172,160 C266,196 336,258 496,282"/>'
            '<circle class="fl-s" cx="496" cy="156" r="12"/>'
            '<circle class="ac" cx="496" cy="282" r="12"/>')


SPEC = [
    ('mufia',       mufia,     'FREQUENCY ATTACK'),
    ('little-fog',  fog,       'ADVERSARIAL WEATHER'),
    ('clad',        clad,      'BACKGROUND DEBIASING'),
    ('lat',         lat,       'LATENT LAYERS'),
    ('eren',        eren,      'PRE-PROCESSING'),
    ('subspace',    subspace,  'LOW-DIM SUBSPACE'),
    ('fairness',    fairness,  'TRADE-OFF'),
]
out = pathlib.Path('/tmp/covers')
for name, fn, kw in SPEC:
    (out / f'{name}.svg').write_text(cover(fn(), kw))
print('wrote', len(SPEC), 'covers')
