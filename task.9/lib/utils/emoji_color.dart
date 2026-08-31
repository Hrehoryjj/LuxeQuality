import 'package:flutter/material.dart';

class EmojiColor {
  EmojiColor._();

  static const List<Color> _palette = [
    Color(0xFFFFE5E5), // soft red
    Color(0xFFFFEDD5), // soft orange
    Color(0xFFFFF9C4), // soft yellow
    Color(0xFFE8F5E9), // soft green
    Color(0xFFE0F7FA), // soft cyan
    Color(0xFFE3F2FD), // soft blue
    Color(0xFFEDE7F6), // soft purple/indigo
    Color(0xFFFCE4EC), // soft pink
    Color(0xFFF3E5F5), // soft violet
    Color(0xFFE8EAF6), // soft slate-blue
    Color(0xFFFFF3E0), // soft amber
    Color(0xFFE0F2F1), // soft teal
  ];

  static const List<Color> _paletteDark = [
    Color(0xFF4A1515), // deep red
    Color(0xFF4A2800), // deep orange
    Color(0xFF3D3400), // deep yellow
    Color(0xFF0D3318), // deep green
    Color(0xFF003740), // deep cyan
    Color(0xFF0A2540), // deep blue
    Color(0xFF1E1040), // deep purple
    Color(0xFF40101E), // deep pink
    Color(0xFF2A0D40), // deep violet
    Color(0xFF101530), // deep slate
    Color(0xFF402600), // deep amber
    Color(0xFF003830), // deep teal
  ];

  static Color backgroundFor(String emoji, {bool dark = false}) {
    if (emoji.isEmpty) return dark ? const Color(0xFF2C2C2E) : const Color(0xFFE8E9F0);
    final palette = dark ? _paletteDark : _palette;
    final hash = _hashEmoji(emoji);
    return palette[hash % palette.length];
  }

  static int _hashEmoji(String emoji) {
    var h = 0;
    for (final rune in emoji.runes) {
      h = (h * 31 + rune) & 0x7FFFFFFF;
    }
    return h.abs();
  }
}
