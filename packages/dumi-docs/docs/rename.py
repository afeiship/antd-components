#!/usr/bin/env python3
import os
import re
import subprocess
import sys
from pathlib import Path

def pascal_to_kebab(name: str) -> str:
    """将 PascalCase 转换为 kebab-case"""
    s1 = re.sub(r'(.)([A-Z][a-z]+)', r'\1-\2', name)
    s2 = re.sub(r'([a-z0-9])([A-Z])', r'\1-\2', s1)
    return s2.lower()

def is_tracked_by_git(file_path: Path) -> bool:
    """检查文件是否已被 Git 跟踪"""
    try:
        result = subprocess.run(
            ["git", "ls-files", "--error-unmatch", str(file_path)],
            cwd=Path.cwd(),
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
        )
        return result.returncode == 0
    except Exception:
        return False

def run_git_mv(src: Path, dst: Path):
    """使用 git mv 安全重命名"""
    try:
        subprocess.run(
            ["git", "mv", str(src), str(dst)],
            cwd=Path.cwd(),
            check=True,
        )
        print(f"✅ git mv: {src.name} → {dst.name}")
    except subprocess.CalledProcessError as e:
        print(f"❌ git mv 失败: {src} → {dst} | 错误: {e}")

def main():
    components_dir = Path("components")
    if not components_dir.exists():
        print(f"❌ 目录不存在: {components_dir.resolve()}")
        sys.exit(1)

    md_files = list(components_dir.glob("*.md"))
    if not md_files:
        print("⚠️  components/ 下没有 .md 文件")
        return

    for file_path in md_files:
        stem = file_path.stem
        # 跳过已经是 kebab-case 或全小写的（可选）
        if '-' in stem or stem.islower():
            continue

        new_stem = pascal_to_kebab(stem)
        new_name = new_stem + file_path.suffix
        new_path = file_path.parent / new_name

        if new_path == file_path:
            continue

        # 检查目标是否已存在（避免冲突）
        if new_path.exists():
            print(f"⚠️  目标已存在，跳过: {new_path}")
            continue

        # 确保文件已被 Git 跟踪（否则 git mv 会报错）
        if not is_tracked_by_git(file_path):
            print(f"⚠️  文件未被 Git 跟踪，先 git add: {file_path}")
            # 可选：自动 add
            try:
                subprocess.run(["git", "add", str(file_path)], check=True)
                print(f"➕ 已自动 git add: {file_path}")
            except subprocess.CalledProcessError:
                print(f"❌ 无法 git add: {file_path}")
                continue

        run_git_mv(file_path, new_path)

if __name__ == "__main__":
    main()
