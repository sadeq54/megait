"""Bake a2 artwork onto the ai3dgen ribbon mesh -> public/m.glb.

Planar projection: mesh XY bbox -> the artwork's own letter bbox. The dust
field is part of the brand look, so the bbox threshold keeps it. Front face
orientation is verified by renders afterwards (FrontSide, both sides).
"""
import io
from pathlib import Path

import numpy as np
import trimesh
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "public" / "a1-master.glb"
ART = ROOT / "public" / "a2-master.png"
OUT = ROOT / "public" / "m.glb"

scene = trimesh.load(str(SRC))
mesh = (
    scene if isinstance(scene, trimesh.Trimesh)
    else trimesh.util.concatenate(list(scene.geometry.values()))
)
print(f"loaded faces={len(mesh.faces)} verts={len(mesh.vertices)} "
      f"watertight={mesh.is_watertight} bounds={np.round(mesh.bounds,1).tolist()}")

# orient: thickness = smallest extent axis becomes Z, letter plane XY
ext = mesh.extents
order = np.argsort(ext)[::-1]  # big, mid, small
if not (order[0] in (0, 1) and order[1] in (0, 1)):
    # letter plane is not XY: rotate smallest axis onto Z
    axes = {0: "X", 1: "Y", 2: "Z"}
    print(f"reorienting: extents={np.round(ext,1)} smallest={axes[int(np.argsort(ext)[0])]}")
    small = int(np.argsort(ext)[0])
    if small == 0:
        mesh.apply_transform(trimesh.transformations.rotation_matrix(np.pi / 2, [0, 1, 0]))
    elif small == 1:
        mesh.apply_transform(trimesh.transformations.rotation_matrix(np.pi / 2, [1, 0, 0]))
mesh.apply_translation(-mesh.bounds.mean(axis=0))

img = Image.open(ART).convert("RGB")
arr = np.asarray(img, dtype=np.uint16)
mask = arr.sum(axis=2) > 60
ys, xs = np.where(mask)
x0, x1, y0, y1 = xs.min(), xs.max(), ys.min(), ys.max()
print(f"art letter bbox=({x0},{y0})-({x1},{y1}) of {img.size}")

(bx0, by0, _), (bx1, by1, _) = mesh.bounds
v = mesh.vertices
u = (v[:, 0] - bx0) / (bx1 - bx0)
w = (v[:, 1] - by0) / (by1 - by0)
U = (x0 + u * (x1 - x0)) / img.size[0]
V = 1.0 - (y1 - w * (y1 - y0)) / img.size[1]
uv = np.column_stack([U, V])

small = img.resize((1024, 1024), Image.LANCZOS)
buf = io.BytesIO()
small.save(buf, format="JPEG", quality=88)
buf.seek(0)
tex = Image.open(buf)

mesh.visual = trimesh.visual.texture.TextureVisuals(
    uv=uv,
    material=trimesh.visual.material.PBRMaterial(
        baseColorTexture=tex, metallicFactor=0.0, roughnessFactor=0.6,
    ),
)
mesh.export(str(OUT))
print(f"exported {OUT.name} {OUT.stat().st_size/1024:.0f} KB")
